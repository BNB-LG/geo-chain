import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "BNB");

  // 1. Deploy GEOSuggestionNFT
  const NFT = await ethers.getContractFactory("GEOSuggestionNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("GEOSuggestionNFT deployed to:", nftAddress);

  // 2. Deploy PaymentRouter
  const Router = await ethers.getContractFactory("PaymentRouter");
  const router = await Router.deploy(nftAddress);
  await router.waitForDeployment();
  const routerAddress = await router.getAddress();
  console.log("PaymentRouter deployed to:", routerAddress);

  // 3. Authorize PaymentRouter as a minter on the NFT contract
  const tx = await nft.setPaymentRouter(routerAddress);
  await tx.wait();
  console.log("PaymentRouter set as authorized minter on NFT contract");

  // 4. Configure default prices (adjust as needed for demo)
  //    BNB price: 0.001 BNB
  const bnbPrice = ethers.parseEther("0.001");
  const txBnb = await router.setTokenPrice(ethers.ZeroAddress, bnbPrice);
  await txBnb.wait();
  console.log("BNB price set to 0.001 BNB");

  // Summary
  console.log("\n=== Deployment Summary ===");
  console.log("Network:            BSC Testnet");
  console.log("GEOSuggestionNFT:  ", nftAddress);
  console.log("PaymentRouter:     ", routerAddress);
  console.log("BNB mint price:     0.001 BNB");
  console.log("\nNext steps:");
  console.log("  - Call router.setTokenPrice(tokenAddr, price) for each ERC-20 you want to accept");
  console.log("  - Verify contracts on BscScan with: npx hardhat verify --network bscTestnet <address>");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
