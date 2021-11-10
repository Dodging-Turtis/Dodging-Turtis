// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";

contract Turtis is ERC721 {
  using ECDSA for bytes32;

  address public contractOwner; // Owner of this contract

  address[] private users; // Address array to store all the users

  address public signedWalletAddress;

  // Mapping from Token ID to Price
  mapping(uint256 => uint256) public turtlesForSale;

  // Mapping from User address to high score
  mapping(address => string) public userAddressToHighScore;

  // Events

  // Emitted when a new Turtle is generated after reaching a new checkpoint in the game
  event NewTurtleGenerated(uint256 tokenId);

  // Emitted when the data received from the API is successful
  event DataReceivedFromAPI(string ipfsLink);

  // Emitted when a turtle is bought
  event TurtleBought(uint256 tokenId);

  // Emitted when a turtle is put up for sale
  event TurtleUpForSale(uint256 tokenId);

  // Contructor is called when an instance of 'TurtleCharacter' contract is deployed
  constructor() public ERC721("TurtleCharacter", "TRTL") {
    contractOwner = msg.sender;
  }

  // Modifer that checks to see if msg.sender == contractOwner
  modifier onlyContractOwner() {
    require(
      msg.sender == contractOwner,
      "The caller is not the contract owner"
    );
    _;
  }

  // Function 'getUsers' returns the address array of users
  function getUsers() public view returns (address[] memory) {
    return users;
  }

  // Function 'setHighScore' sets a new highScore for the user
  function setHighScore(string memory _highScore, address _sender) internal {
    bytes memory score = bytes(userAddressToHighScore[_sender]);
    if (score.length == 0) {
      users.push(_sender);
    }
    userAddressToHighScore[_sender] = _highScore;
  }

  function generateTurtle(
    string memory _highScore,
    string memory _tokenURI,
    bytes memory _signature
  ) public {
    string memory message = string(
      abi.encodePacked(
        _highScore,
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
      keccak256(bytes(userAddressToHighScore[msg.sender])) !=
        keccak256(bytes(_highScore)),
      "Already minted at this score before"
    );
    uint256 lastTokenId = totalSupply() - 1;
    _safeMint(msg.sender, lastTokenId);
    _setTokenURI(lastTokenId, _tokenURI);
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

  function setSignedWalletAddress(address _walletAddress)
    public
    onlyContractOwner
  {
    signedWalletAddress = _walletAddress;
  }

  // Function 'updateTokenURI' updates the Token URI for a specific Token
  function updateTokenURI(uint256 _tokenId, string memory _tokenURI)
    public
    onlyContractOwner
  {
    _setTokenURI(_tokenId, _tokenURI);
  }
}
