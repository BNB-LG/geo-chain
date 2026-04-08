// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GEOSuggestionNFT
 * @notice ERC-721 NFT representing a GEO optimization suggestion.
 *         Each token stores on-chain metadata: project name, GEO score,
 *         suggestion content hash, and mint timestamp.
 */
contract GEOSuggestionNFT is ERC721, ERC721URIStorage, Ownable {
    // ───────── Storage ─────────

    uint256 private _nextTokenId;

    /// @notice Address of the PaymentRouter that is authorized to mint.
    address public paymentRouter;

    struct Suggestion {
        string projectName;
        uint256 geoScore;
        bytes32 suggestionHash;
        uint256 timestamp;
    }

    /// @notice On-chain metadata for each token.
    mapping(uint256 => Suggestion) public suggestions;

    // ───────── Events ─────────

    event SuggestionMinted(
        uint256 indexed tokenId,
        address indexed to,
        string projectName,
        uint256 geoScore,
        bytes32 suggestionHash
    );

    event PaymentRouterUpdated(address indexed oldRouter, address indexed newRouter);

    // ───────── Errors ─────────

    error Unauthorized();
    error ZeroAddress();

    // ───────── Constructor ─────────

    constructor() ERC721("GEO Suggestion", "GEOS") Ownable(msg.sender) {}

    // ───────── Modifiers ─────────

    modifier onlyMinter() {
        if (msg.sender != owner() && msg.sender != paymentRouter) {
            revert Unauthorized();
        }
        _;
    }

    // ───────── Admin ─────────

    /**
     * @notice Set the PaymentRouter address that is allowed to mint.
     * @param _router The PaymentRouter contract address.
     */
    function setPaymentRouter(address _router) external onlyOwner {
        if (_router == address(0)) revert ZeroAddress();
        emit PaymentRouterUpdated(paymentRouter, _router);
        paymentRouter = _router;
    }

    // ───────── Mint ─────────

    /**
     * @notice Mint a new GEO Suggestion NFT.
     * @param to          Recipient address.
     * @param _tokenURI   IPFS URI for the token metadata JSON.
     * @param projectName Human-readable project name.
     * @param geoScore    GEO optimization score (0-100).
     * @param suggestionHash keccak256 hash of the full suggestion content.
     * @return tokenId    The newly minted token ID.
     */
    function mint(
        address to,
        string calldata _tokenURI,
        string calldata projectName,
        uint256 geoScore,
        bytes32 suggestionHash
    ) external onlyMinter returns (uint256 tokenId) {
        tokenId = _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        suggestions[tokenId] = Suggestion({
            projectName: projectName,
            geoScore: geoScore,
            suggestionHash: suggestionHash,
            timestamp: block.timestamp
        });

        emit SuggestionMinted(tokenId, to, projectName, geoScore, suggestionHash);
    }

    // ───────── View ─────────

    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }

    // ───────── Overrides ─────────

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
