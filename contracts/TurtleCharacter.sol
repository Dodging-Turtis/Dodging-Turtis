// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract TurtleCharacter is ERC721, ChainlinkClient {
    address public contractOwner; // Owner of this contract

    // Bytes32 data related to IPFS Hash returned from the API
    bytes32 private ipfsHashOneBytes32;
    bytes32 private ipfsHashTwoBytes32;

    string public ipfsLink = "https://ipfs.io/ipfs/"; // Stores the IPFS link after the API call

    // Chainlink Oracle, Job ID and fee required for making the API call using Chainlink
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    uint256 private uniqueTokenId = 0; // Unique TokenID

    string private apiBaseUrl; // Stores the base url of the api
    string private apiSecondUrl; // API url for the second call

    // Mapping from Token ID to Price
    mapping(uint256 => uint256) public turtlesForSale;

    // Events

    // Emitted when a new Turtle is generated after reaching a new checkpoint in the game
    event NewTurtleGenerated(uint256 tokenId);

    // Emitted when the data received from the API is successful
    event DataReceivedFromAPI(string ipfsLink);

    // Emitted when a turtle is bought
    event TurtleBought(uint256 tokenId);

    // Emitted when a turtle is put up for sale
    event TurtleUpForSale(uint256 tokenId);

    /**
     * Network: Matic Mumbai Testnet
     * Oracle: 0xc8D925525CA8759812d0c299B90247917d4d4b7C
     * Job ID: a7330d0b4b964c05abc66a26307047c0
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */

    // Contructor is called when an instance of 'TurtleCharacter' contract is deployed
    constructor() public ERC721("TurtleCharacter", "TRTL") {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);

        uniqueTokenId = 0;
        contractOwner = msg.sender;
        apiBaseUrl = "https://images-blend.herokuapp.com/";
        apiSecondUrl = "https://images-blend.herokuapp.com/second/";

        oracle = 0xc8D925525CA8759812d0c299B90247917d4d4b7C; // Address of the chainlink oracle
        jobId = "a7330d0b4b964c05abc66a26307047c0"; // This Job gets data from an API in the form of a bytes32 variable
        fee = 0.01 * 10**18; // 0.01 LINK (Fee for Chainlink Oracle for returning the required data)
    }

    // Modifer that checks to see if msg.sender == contractOwner
    modifier onlyContractOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    // Function 'setOracleAddress' sets a new oracle address
    function setOracleAddress(address _oracleAddress) public onlyContractOwner {
        oracle = _oracleAddress;
    }

    // Function 'setJobID' sets a new job ID
    function setJobID(bytes32 _jobID) public onlyContractOwner {
        jobId = _jobID;
    }

    // Function 'setFeeInLink' sets a new fee for the Chainlink Oracle
    function setFeeInLink(uint256 _fee) public onlyContractOwner {
        fee = _fee * 10**18;
    }

    // Function 'setApiBaseUrl' sets a new base URL link for the API
    function setApiBaseUrl(string memory _url) public onlyContractOwner {
        apiBaseUrl = _url;
    }

    // Function 'setApiSecondUrl' sets a new second URL link for the API
    function setApiSecondUrl(string memory _url) public onlyContractOwner {
        apiSecondUrl = _url;
    }

    // Function 'buyTurtle' allows anyone to buy a turtle that is put up for sale
    function buyTurtle(uint256 _tokenId) public payable {
        require(
            turtlesForSale[_tokenId] > 0,
            "The Turtle should be up for sale"
        );

        uint256 turtleCost = turtlesForSale[_tokenId];
        turtlesForSale[_tokenId] = 0;

        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > turtleCost, "You need to have enough Ether");

        _safeTransfer(
            ownerAddress,
            msg.sender,
            _tokenId,
            bytes("Buy a Turtle")
        ); // ERC721 Token is safely transferred using this function call

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

    // Function 'requestNewRandomTurtle' mints a new Turtle character
    function requestNewRandomTurtle() public {
        ipfsLink = "https://ipfs.io/ipfs/";
        _safeMint(msg.sender, uniqueTokenId);
        requestIPFSHash();
    }

    // Function 'requestIPFSHash' requests a new IPFS hash from the API
    function requestIPFSHash() private returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        request.add("get", apiBaseUrl);
        request.add("path", "IPFS_PATH");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Function 'fulfill' is called after the response for the API call is received
    function fulfill(bytes32 _requestId, bytes32 dataFromAPI)
        public
        recordChainlinkFulfillment(_requestId)
        returns (bytes32 requestId)
    {
        ipfsHashOneBytes32 = dataFromAPI;

        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillSecondRequest.selector
        );
        request.add("get", apiSecondUrl);
        request.add("path", "IPFS_PATH");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Function 'fulfillSecondRequest' is called after the response for the API call is received
    function fulfillSecondRequest(bytes32 _requestId, bytes32 dataFromAPI)
        public
        recordChainlinkFulfillment(_requestId)
    {
        ipfsHashTwoBytes32 = dataFromAPI;
        generateIPFSLink();

        emit DataReceivedFromAPI(ipfsLink);

        setTokenURI(ipfsLink);

        emit NewTurtleGenerated(uniqueTokenId - 1);
    }

    // Function 'bytes32ToString' convers a bytes32 variable to a string variable
    function bytes32ToString(bytes32 _bytes32)
        internal
        pure
        returns (string memory)
    {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    // Function 'generateIPFSLink' generates the IPFS link from the 2 API calls
    function generateIPFSLink() private {
        string memory ipfsHashPartOne = bytes32ToString(ipfsHashOneBytes32);
        string memory ipfsHashPartTwo = bytes32ToString(ipfsHashTwoBytes32);
        ipfsLink = append(ipfsLink, ipfsHashPartOne, ipfsHashPartTwo);
    }

    // Function 'append' appends 3 strings
    function append(
        string memory a,
        string memory b,
        string memory c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    // Function 'withdrawLink' allows the contract owner to withdraw the LINK from the contract
    function withdrawLink() external onlyContractOwner {
        LinkTokenInterface linkToken = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        require(
            linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
            "Unable to transfer LINK"
        );
    }

    // Function 'setTokenURI' sets the Token URI for the ERC721 standard token
    function setTokenURI(string memory _tokenURI) private {
        _setTokenURI(uniqueTokenId, _tokenURI);
        uniqueTokenId++;
    }
}
