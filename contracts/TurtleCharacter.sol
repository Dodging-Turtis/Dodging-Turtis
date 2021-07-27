// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TurtleCharacter is ChainlinkClient, ERC721 {
  
    bytes32 public volume;
    bytes32 public volume2;
    string public ipfsLink = "https://ipfs.io/ipfs/";
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint256 uniqueTokenId = 0;
    
    /**
     * Network: Kovan
     * Chainlink - 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Chainlink - 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public ERC721("TurtleCharacter", "TRTL") {
        setPublicChainlinkToken();
        oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "b7285d4859da4b289c7861db971baf0a";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
     
    function requestRandomCharacter() public {
        ipfsLink = "https://ipfs.io/ipfs/";
        _safeMint(msg.sender, uniqueTokenId);
        requestVolumeData();
    }
     
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://images-blend.herokuapp.com/");
        
        request.add("path", "IPFS_PATH");
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of bytes32
     */ 
    function fulfill(bytes32 _requestId, bytes32 _volume) public recordChainlinkFulfillment(_requestId) returns (bytes32 requestId) 
    {
        volume = _volume;

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillSecondRequest.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://images-blend.herokuapp.com/second");
        
        request.add("path", "IPFS_PATH");
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfillSecondRequest(bytes32 _requestId, bytes32 _volume) public recordChainlinkFulfillment(_requestId) {
        volume2 = _volume;
        generateIPFSLink();
        setTokenURI(ipfsLink);
    }
    
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
    
    function generateIPFSLink() public {
        string memory part1 = bytes32ToString(volume);
        string memory part2 = bytes32ToString(volume2);
        ipfsLink = append(ipfsLink, part1, part2);
    }
    
    function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {
    return string(abi.encodePacked(a, b, c));
    }
    
    /**
     * Withdraw LINK from this contract
     * 
     * NOTE: DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES ONLY.
     */
    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }

    function setTokenURI(string memory _tokenURI) private {
        _setTokenURI(uniqueTokenId, _tokenURI);
        uniqueTokenId++;
    }
}