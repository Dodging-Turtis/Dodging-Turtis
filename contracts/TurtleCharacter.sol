// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TurtleCharacter is ChainlinkClient, ERC721 {
    address public contractOwner;


    bytes32 private ipfsHashOneBytes32;
    bytes32 private ipfsHashTwoBytes32;
    string public ipfsLink = "https://ipfs.io/ipfs/";

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint256 private uniqueTokenId = 0;

    /**
     * Network: Rinkeby
     * Oracle - 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40
     * Job ID - 187bb80e5ee74a139734cac7475f3c6e
     * Fee: 0.01 LINK
     */
    constructor() public ERC721("TurtleCharacter", "TRTL") {
        setPublicChainlinkToken();
        contractOwner = msg.sender;
        oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
        jobId = "187bb80e5ee74a139734cac7475f3c6e";
        fee = 0.01 * 10**18; // 0.01 LINK
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    function requestRandomCharacter() public {
        ipfsLink = "https://ipfs.io/ipfs/";
        _safeMint(msg.sender, uniqueTokenId);
        requestIPFSHash();
    }

    function requestIPFSHash() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        request.add("get", "https://images-blend.herokuapp.com/");
        request.add("path", "IPFS_PATH");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bytes32 dataFromAPI) public recordChainlinkFulfillment(_requestId) returns (bytes32 requestId) {
        ipfsHashOneBytes32 = dataFromAPI;

        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillSecondRequest.selector
        );
        request.add("get", "https://images-blend.herokuapp.com/second");
        request.add("path", "IPFS_PATH");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfillSecondRequest(bytes32 _requestId, bytes32 dataFromAPI) public recordChainlinkFulfillment(_requestId) {
        ipfsHashTwoBytes32 = dataFromAPI;
        generateIPFSLink();
        setTokenURI(ipfsLink);
    }

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
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

    function generateIPFSLink() private {
        string memory ipfsHashPartOne = bytes32ToString(ipfsHashOneBytes32);
        string memory ipfsHashPartTwo = bytes32ToString(ipfsHashTwoBytes32);
        ipfsLink = append(ipfsLink, ipfsHashPartOne, ipfsHashPartTwo);
    }

    function append(
        string memory a,
        string memory b,
        string memory c
    ) public pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        require(
            linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
            "Unable to transfer LINK"
        );
    }

    function setTokenURI(string memory _tokenURI) private {
        _setTokenURI(uniqueTokenId, _tokenURI);
        uniqueTokenId++;
    }
}
