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

  // Mapping from Token ID to Price
  mapping(uint256 => uint256) public turtlesForSale;

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

  // Contructor is called when an instance of 'TurtleCharacter' contract is deployed
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
    bytes memory _signature
  ) public nonReentrant {
    string memory message = string(
      abi.encodePacked(
        uint2str(_score),
        string(abi.encodePacked(msg.sender)),
        _tokenURI
      )
    );

    bytes32 hash = keccak256(
      abi.encodePacked(
        "\x19Ethereum Signed Message:\n32",
        keccak256(abi.encodePacked(message))
      )
    );
    address walletAddress = hash.recover(_signature);
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
    setApprovalForAll(marketContractAddress, true);

    emit NewTurtleGenerated(_tokenID);
  }

  // Function 'upgradeTurtle' upgrades an existing Turtle NFT
  function upgradeTurtle(
    uint256 _score,
    string memory _tokenURI,
    bytes memory _signature,
    uint256 _tokenId
  ) public {
    string memory message = string(
      abi.encodePacked(
        uint2str(_score),
        string(abi.encodePacked(msg.sender)),
        _tokenURI,
        uint2str(_tokenId)
      )
    );

    bytes32 hash = keccak256(
      abi.encodePacked(
        "\x19Ethereum Signed Message:\n32",
        keccak256(abi.encodePacked(message))
      )
    );
    address walletAddress = hash.recover(_signature);
    require(walletAddress == signedWalletAddress, "Invalid signature");
    require(
      _score > userAddressToHighScore[msg.sender],
      "Already minted at this score before"
    );
    setHighScore(_score, msg.sender);
    _setTokenURI(_tokenId, _tokenURI);

    emit TurtleUpgraded(_tokenId);
  }

  // Function 'buyTurtle' allows anyone to buy a turtle that is put up for sale
  function buyTurtle(uint256 _tokenId) public payable {
    require(turtlesForSale[_tokenId] > 0, "The Turtle should be up for sale");

    uint256 turtleCost = turtlesForSale[_tokenId];
    turtlesForSale[_tokenId] = 0;

    address ownerAddress = ownerOf(_tokenId);
    require(msg.value > turtleCost, "You need to have enough Ether");

    _safeTransfer(ownerAddress, msg.sender, _tokenId, bytes("Buy a Turtle")); // ERC721 Token is safely transferred using this function call

    address payable ownerAddressPayable = payable(ownerAddress);
    ownerAddressPayable.transfer(turtleCost);
    if (msg.value > turtleCost) {
      payable(msg.sender).transfer(msg.value - turtleCost); // Excess Ether is returned back to the buyer
    }

    emit TurtleBought(_tokenId);
  }

  // Function 'putUpTurtleForSale' allows a turtle owner to put it up for sale
  function putUpTurtleForSale(uint256 _tokenId, uint256 _price) public {
    require(
      _isApprovedOrOwner(_msgSender(), _tokenId),
      "ERC721: Caller is not owner nor approved"
    );
    turtlesForSale[_tokenId] = _price;

    emit TurtleUpForSale(_tokenId);
  }

  // Function 'setTokenURI' sets the Token URI for the ERC721 standard token
  function setTokenURI(string memory _tokenURI) private {
    uint256 lastTokenId = totalSupply() - 1;
    _setTokenURI(lastTokenId, _tokenURI);
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
  }

  function getBalanceOfUser(address _user) public view returns (uint256) {
    return balanceOf(_user);
  }

  function getUserOwnedNFTs(address _user)
    public
    view
    returns (uint256[] memory)
  {
    uint256[] memory nfts = new uint256[](getBalanceOfUser(_user));
    // implement logic
    return nfts;
  }

  function getAllNFTs() public view returns (uint256[] memory) {
    uint256[] memory nfts = new uint256[](totalSupply());
    // implement logic
    return nfts;
  }
}
