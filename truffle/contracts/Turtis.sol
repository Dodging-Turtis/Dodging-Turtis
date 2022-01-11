// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Turtis is ERC721URIStorage, ReentrancyGuard {
  using ECDSA for bytes32;
  using Counters for Counters.Counter;
  Counters.Counter private _totalSupply;

  address payable public contractOwner; // Owner of this contract
  address private marketContractAddress;

  address[] private users; // Address array to store all the users

  address public signedWalletAddress;

  // Mapping from User address to high score
  mapping(address => uint256) public userAddressToHighScore;

  // Events

  // Emitted when a new Turtle is generated after reaching a new checkpoint in the game
  event NewTurtleGenerated(uint256 tokenId);

  // Emitted when an existing Turtle is upgraded by its owner
  event TurtleUpgraded(uint256 tokenId);

  // Emitted when a Turtle is bought
  event TurtleBought(uint256 tokenId);

  // Emitted when a Turtle is put up for sale
  event TurtleUpForSale(uint256 tokenId);

  struct NFTItem {
    uint256 tokenId;
    string tokenURI;
  }

  mapping(uint256 => NFTItem) tokenIdToNFTItem;

  // Contructor is called when an instance of 'TurtleMarket' contract is deployed
  constructor(address marketplaceAddress) ERC721("TurtleCharacter", "TRTL") {
    contractOwner = payable(msg.sender);
    marketContractAddress = marketplaceAddress;
  }

  // Modifer that checks to see if msg.sender == contractOwner
  modifier onlyContractOwner() {
    require(
      msg.sender == contractOwner,
      "The caller is not the contract owner"
    );
    _;
  }

  // Function 'totalSupply' returns the total token supply of this contract
  function totalSupply() public view returns (uint256) {
    return _totalSupply.current();
  }

  function setMarketContractAddress(address _contractAddress)
    public
    onlyContractOwner
  {
    marketContractAddress = _contractAddress;
  }

  // Function 'getUsers' returns the address array of users
  function getUsers() public view returns (address[] memory) {
    return users;
  }

  // Function 'setHighScore' sets a new highScore for the user
  function setHighScore(uint256 _newHighScore, address _sender) internal {
    if (userAddressToHighScore[_sender] == 0) {
      users.push(_sender);
    }
    userAddressToHighScore[_sender] = _newHighScore;
  }

  // Function 'generateTurtle' mints a new Turtle NFT for the user
  function generateTurtle(
    uint256 _score,
    string memory _tokenURI,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) public nonReentrant {
    bytes32 message = keccak256(
      abi.encodePacked(_score, msg.sender, _tokenURI)
    );

    bytes32 messageHash = message.toEthSignedMessageHash();
    address walletAddress = messageHash.recover(v, r, s);
    require(walletAddress == signedWalletAddress, "Invalid signature");
    require(
      _score > userAddressToHighScore[msg.sender],
      "Already minted at this score before"
    );
    setHighScore(_score, msg.sender);
    uint256 _tokenID = totalSupply();
    _safeMint(msg.sender, _tokenID);
    _totalSupply.increment();
    _setTokenURI(_tokenID, _tokenURI);
    tokenIdToNFTItem[_tokenID] = NFTItem(_tokenID, _tokenURI);
    setApprovalForAll(marketContractAddress, true);

    emit NewTurtleGenerated(_tokenID);
  }

  // Function 'upgradeTurtle' upgrades an existing Turtle NFT
  function upgradeTurtle(
    uint256 _score,
    string memory _tokenURI,
    uint256 _tokenId,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) public nonReentrant {
    bytes32 message = keccak256(
      abi.encodePacked(_score, msg.sender, _tokenURI, _tokenId)
    );

    bytes32 messageHash = message.toEthSignedMessageHash();
    address walletAddress = messageHash.recover(v, r, s);
    require(walletAddress == signedWalletAddress, "Invalid signature");
    require(
      _score > userAddressToHighScore[msg.sender],
      "Already minted at this score before"
    );
    setHighScore(_score, msg.sender);
    _setTokenURI(_tokenId, _tokenURI);
    tokenIdToNFTItem[_tokenId] = NFTItem(_tokenId, _tokenURI);

    emit TurtleUpgraded(_tokenId);
  }

  // Function 'setTokenURI' sets the Token URI for the ERC721 standard token
  function setTokenURI(string memory _tokenURI) private {
    uint256 lastTokenId = totalSupply() - 1;
    _setTokenURI(lastTokenId, _tokenURI);
    tokenIdToNFTItem[lastTokenId] = NFTItem(lastTokenId, _tokenURI);
  }

  // Function 'setSignedWalletAddress' sets the address of the wallet that signs the minting of the Turtle NFT
  function setSignedWalletAddress(address _walletAddress)
    public
    onlyContractOwner
  {
    signedWalletAddress = _walletAddress;
  }

  // Function 'uint2str' converts a uint256 variable to a string variable
  function uint2str(uint256 _i)
    internal
    pure
    returns (string memory _uintAsString)
  {
    if (_i == 0) {
      return "0";
    }
    uint256 j = _i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint256 k = len;
    while (_i != 0) {
      k = k - 1;
      uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
      bytes1 b1 = bytes1(temp);
      bstr[k] = b1;
      _i /= 10;
    }
    return string(bstr);
  }

  // Function 'updateTokenURI' updates the Token URI for a specific Token
  function updateTokenURI(uint256 _tokenId, string memory _tokenURI)
    public
    onlyContractOwner
  {
    _setTokenURI(_tokenId, _tokenURI);
    tokenIdToNFTItem[_tokenId] = NFTItem(_tokenId, _tokenURI);
  }

  function getBalanceOfUser(address _user) public view returns (uint256) {
    return balanceOf(_user);
  }

  function getUserOwnedNFTs(address _user)
    public
    view
    returns (NFTItem[] memory)
  {
    NFTItem[] memory nfts = new NFTItem[](getBalanceOfUser(_user));
    uint256 totalNFTCount = totalSupply();
    uint256 curInd = 0;
    for (uint256 i = 0; i < totalNFTCount; i++) {
      if (ownerOf(i) == _user) {
        NFTItem storage curItem = tokenIdToNFTItem[i];
        nfts[curInd++] = curItem;
      }
    }
    return nfts;
  }

  function getAllNFTs() public view returns (NFTItem[] memory) {
    uint256 totalNFTCount = totalSupply();
    NFTItem[] memory nfts = new NFTItem[](totalNFTCount);
    for (uint256 i = 0; i < totalNFTCount; i++) {
      NFTItem storage curItem = tokenIdToNFTItem[i];
      nfts[i] = curItem;
    }
    return nfts;
  }
}
