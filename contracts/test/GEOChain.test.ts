import { expect } from "chai";
import { ethers } from "hardhat";
import { GEOSuggestionNFT, PaymentRouter } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GEO-Chain Contracts", function () {
  let nft: GEOSuggestionNFT;
  let router: PaymentRouter;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let other: SignerWithAddress;

  // Test constants
  const PROJECT_NAME = "TestProject";
  const GEO_SCORE = 85;
  const SUGGESTION_HASH = ethers.keccak256(ethers.toUtf8Bytes("Optimize meta descriptions for AI crawlers"));
  const TOKEN_URI = "ipfs://QmTestHash123/metadata.json";
  const BNB_PRICE = ethers.parseEther("0.001");

  beforeEach(async function () {
    [owner, user, other] = await ethers.getSigners();

    // Deploy NFT
    const NFT = await ethers.getContractFactory("GEOSuggestionNFT");
    nft = await NFT.deploy();
    await nft.waitForDeployment();

    // Deploy Router
    const Router = await ethers.getContractFactory("PaymentRouter");
    router = await Router.deploy(await nft.getAddress());
    await router.waitForDeployment();

    // Authorize router
    await nft.setPaymentRouter(await router.getAddress());

    // Set BNB price
    await router.setTokenPrice(ethers.ZeroAddress, BNB_PRICE);
  });

  // ─────────────────────────────────────────────
  // GEOSuggestionNFT
  // ─────────────────────────────────────────────

  describe("GEOSuggestionNFT", function () {
    it("should allow owner to mint directly", async function () {
      const tx = await nft.mint(user.address, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH);
      await tx.wait();

      expect(await nft.ownerOf(0)).to.equal(user.address);
      expect(await nft.tokenURI(0)).to.equal(TOKEN_URI);
      expect(await nft.totalSupply()).to.equal(1);
    });

    it("should store suggestion metadata on-chain", async function () {
      await nft.mint(user.address, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH);

      const s = await nft.suggestions(0);
      expect(s.projectName).to.equal(PROJECT_NAME);
      expect(s.geoScore).to.equal(GEO_SCORE);
      expect(s.suggestionHash).to.equal(SUGGESTION_HASH);
      expect(s.timestamp).to.be.gt(0);
    });

    it("should reject mint from unauthorized address", async function () {
      await expect(
        nft.connect(other).mint(user.address, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH)
      ).to.be.revertedWithCustomError(nft, "Unauthorized");
    });

    it("should emit SuggestionMinted event", async function () {
      await expect(nft.mint(user.address, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH))
        .to.emit(nft, "SuggestionMinted")
        .withArgs(0, user.address, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH);
    });

    it("should reject setPaymentRouter with zero address", async function () {
      await expect(nft.setPaymentRouter(ethers.ZeroAddress)).to.be.revertedWithCustomError(nft, "ZeroAddress");
    });

    it("should reject setPaymentRouter from non-owner", async function () {
      await expect(
        nft.connect(other).setPaymentRouter(other.address)
      ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount");
    });
  });

  // ─────────────────────────────────────────────
  // PaymentRouter - BNB payments
  // ─────────────────────────────────────────────

  describe("PaymentRouter - BNB", function () {
    it("should mint NFT on BNB payment", async function () {
      const tx = await router.connect(user).payWithBNB(TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH, {
        value: BNB_PRICE,
      });
      await tx.wait();

      expect(await nft.ownerOf(0)).to.equal(user.address);
      expect(await nft.tokenURI(0)).to.equal(TOKEN_URI);
    });

    it("should refund excess BNB", async function () {
      const overpay = ethers.parseEther("0.01");
      const balBefore = await ethers.provider.getBalance(user.address);

      const tx = await router.connect(user).payWithBNB(TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH, {
        value: overpay,
      });
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      const balAfter = await ethers.provider.getBalance(user.address);
      // User should only have spent BNB_PRICE + gas, not the full overpay
      const spent = balBefore - balAfter;
      expect(spent).to.be.closeTo(BNB_PRICE + gasUsed, ethers.parseEther("0.0001"));
    });

    it("should reject insufficient BNB", async function () {
      await expect(
        router.connect(user).payWithBNB(TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH, {
          value: ethers.parseEther("0.0001"),
        })
      ).to.be.revertedWithCustomError(router, "InsufficientPayment");
    });

    it("should emit PaymentReceived event", async function () {
      await expect(
        router.connect(user).payWithBNB(TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH, {
          value: BNB_PRICE,
        })
      )
        .to.emit(router, "PaymentReceived")
        .withArgs(user.address, ethers.ZeroAddress, BNB_PRICE, 0);
    });
  });

  // ─────────────────────────────────────────────
  // PaymentRouter - ERC-20 payments
  // ─────────────────────────────────────────────

  describe("PaymentRouter - ERC-20", function () {
    let mockToken: any;
    const ERC20_PRICE = ethers.parseUnits("10", 18);

    beforeEach(async function () {
      // Deploy a minimal ERC-20 for testing
      const MockERC20 = await ethers.getContractFactory("MockERC20");
      mockToken = await MockERC20.deploy("Mock FOUR", "FOUR", ethers.parseUnits("1000000", 18));
      await mockToken.waitForDeployment();

      const tokenAddr = await mockToken.getAddress();

      // Configure price
      await router.setTokenPrice(tokenAddr, ERC20_PRICE);

      // Give user some tokens and approve
      await mockToken.transfer(user.address, ethers.parseUnits("100", 18));
      await mockToken.connect(user).approve(await router.getAddress(), ethers.MaxUint256);
    });

    it("should mint NFT on ERC-20 payment", async function () {
      const tokenAddr = await mockToken.getAddress();
      await router.connect(user).payWithToken(tokenAddr, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH);

      expect(await nft.ownerOf(0)).to.equal(user.address);
      expect(await mockToken.balanceOf(await router.getAddress())).to.equal(ERC20_PRICE);
    });

    it("should reject unsupported token", async function () {
      await expect(
        router.connect(user).payWithToken(other.address, TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH)
      ).to.be.revertedWithCustomError(router, "UnsupportedToken");
    });
  });

  // ─────────────────────────────────────────────
  // PaymentRouter - Admin
  // ─────────────────────────────────────────────

  describe("PaymentRouter - Admin", function () {
    it("should allow owner to withdraw BNB", async function () {
      // Pay to fill the contract
      await router.connect(user).payWithBNB(TOKEN_URI, PROJECT_NAME, GEO_SCORE, SUGGESTION_HASH, {
        value: BNB_PRICE,
      });

      const routerBal = await ethers.provider.getBalance(await router.getAddress());
      expect(routerBal).to.equal(BNB_PRICE);

      await router.withdrawBNB(owner.address, BNB_PRICE);
      expect(await ethers.provider.getBalance(await router.getAddress())).to.equal(0);
    });

    it("should reject setTokenPrice with zero price", async function () {
      await expect(router.setTokenPrice(ethers.ZeroAddress, 0)).to.be.revertedWithCustomError(router, "ZeroPrice");
    });

    it("should reject admin calls from non-owner", async function () {
      await expect(
        router.connect(other).setTokenPrice(ethers.ZeroAddress, BNB_PRICE)
      ).to.be.revertedWithCustomError(router, "OwnableUnauthorizedAccount");
    });

    it("should return supported tokens list", async function () {
      const tokens = await router.getSupportedTokens();
      expect(tokens.length).to.be.gte(1);
      expect(tokens).to.include(ethers.ZeroAddress);
    });
  });
});
