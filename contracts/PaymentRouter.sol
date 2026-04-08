// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IGEOSuggestionNFT {
    function mint(
        address to,
        string calldata _tokenURI,
        string calldata projectName,
        uint256 geoScore,
        bytes32 suggestionHash
    ) external returns (uint256);
}

/**
 * @title PaymentRouter
 * @notice Accepts ERC-20 tokens ($FOUR, $DGAI, USDT, etc.) or native BNB,
 *         then automatically mints a GEOSuggestionNFT upon successful payment.
 */
contract PaymentRouter is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ───────── Storage ─────────

    IGEOSuggestionNFT public nftContract;

    /// @notice Price denominated in each supported token.
    ///         address(0) represents native BNB.
    mapping(address => uint256) public tokenPrices;

    /// @notice Quick check whether a token address is accepted.
    mapping(address => bool) public supportedTokens;

    /// @notice Enumerate supported tokens for front-end convenience.
    address[] public tokenList;

    // ───────── Events ─────────

    event TokenConfigured(address indexed token, uint256 price);
    event TokenRemoved(address indexed token);
    event PaymentReceived(
        address indexed payer,
        address indexed token,
        uint256 amount,
        uint256 indexed tokenId
    );
    event Withdrawn(address indexed token, address indexed to, uint256 amount);

    // ───────── Errors ─────────

    error UnsupportedToken();
    error InsufficientPayment();
    error WithdrawFailed();
    error ZeroPrice();
    error ZeroAddress();

    // ───────── Constructor ─────────

    constructor(address _nftContract) Ownable(msg.sender) {
        if (_nftContract == address(0)) revert ZeroAddress();
        nftContract = IGEOSuggestionNFT(_nftContract);
    }

    // ───────── Admin: token management ─────────

    /**
     * @notice Add or update a supported payment token and its price.
     * @param token  ERC-20 address, or address(0) for native BNB.
     * @param price  Amount required (in token's smallest unit).
     */
    function setTokenPrice(address token, uint256 price) external onlyOwner {
        if (price == 0) revert ZeroPrice();

        if (!supportedTokens[token]) {
            supportedTokens[token] = true;
            tokenList.push(token);
        }
        tokenPrices[token] = price;

        emit TokenConfigured(token, price);
    }

    /**
     * @notice Remove a token from the supported list.
     */
    function removeToken(address token) external onlyOwner {
        supportedTokens[token] = false;
        tokenPrices[token] = 0;

        // Remove from tokenList to keep getSupportedTokens() accurate
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i] == token) {
                tokenList[i] = tokenList[tokenList.length - 1];
                tokenList.pop();
                break;
            }
        }

        emit TokenRemoved(token);
    }

    // ───────── Pay with ERC-20 ─────────

    /**
     * @notice Pay with an ERC-20 token and receive a GEO Suggestion NFT.
     * @param token          ERC-20 token address.
     * @param tokenURI       IPFS metadata URI.
     * @param projectName    Project name for on-chain record.
     * @param geoScore       GEO score.
     * @param suggestionHash Content hash of the suggestion.
     */
    function payWithToken(
        address token,
        string calldata tokenURI,
        string calldata projectName,
        uint256 geoScore,
        bytes32 suggestionHash
    ) external nonReentrant returns (uint256 tokenId) {
        if (!supportedTokens[token] || token == address(0)) revert UnsupportedToken();

        uint256 price = tokenPrices[token];
        IERC20(token).safeTransferFrom(msg.sender, address(this), price);

        tokenId = nftContract.mint(msg.sender, tokenURI, projectName, geoScore, suggestionHash);

        emit PaymentReceived(msg.sender, token, price, tokenId);
    }

    // ───────── Pay with BNB ─────────

    /**
     * @notice Pay with native BNB and receive a GEO Suggestion NFT.
     */
    function payWithBNB(
        string calldata tokenURI,
        string calldata projectName,
        uint256 geoScore,
        bytes32 suggestionHash
    ) external payable nonReentrant returns (uint256 tokenId) {
        if (!supportedTokens[address(0)]) revert UnsupportedToken();

        uint256 price = tokenPrices[address(0)];
        if (msg.value < price) revert InsufficientPayment();

        tokenId = nftContract.mint(msg.sender, tokenURI, projectName, geoScore, suggestionHash);

        emit PaymentReceived(msg.sender, address(0), price, tokenId);

        // Refund excess BNB (safe: nonReentrant guard prevents reentrancy via call)
        uint256 excess = msg.value - price;
        if (excess > 0) {
            (bool ok, ) = msg.sender.call{value: excess}("");
            if (!ok) revert WithdrawFailed();
        }
    }

    // ───────── Withdraw ─────────

    /**
     * @notice Withdraw collected ERC-20 tokens.
     */
    function withdrawToken(address token, address to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        IERC20(token).safeTransfer(to, amount);
        emit Withdrawn(token, to, amount);
    }

    /**
     * @notice Withdraw collected BNB.
     */
    function withdrawBNB(address payable to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        (bool ok, ) = to.call{value: amount}("");
        if (!ok) revert WithdrawFailed();
        emit Withdrawn(address(0), to, amount);
    }

    // ───────── View ─────────

    function getSupportedTokens() external view returns (address[] memory) {
        return tokenList;
    }

    // ───────── Receive ─────────

    /// @notice Allow the contract to receive BNB directly (e.g. refunds).
    receive() external payable {}
}
