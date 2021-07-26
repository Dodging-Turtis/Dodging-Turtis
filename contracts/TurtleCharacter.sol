// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract TurtleCharacter is ERC721, ChainlinkClient {

    using Chainlink for Chainlink.Request;
  
    bytes32 public volume;
    bytes32 public volume2;
    string public ipfsLink = "https://ipfs.io/ipfs/";
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint uniqueTokenId = 0;
    
    /**
     * Network: Kovan
     * Oracle: 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b
     * Job ID: b7285d4859da4b289c7861db971baf0a
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
        requestVolumeData();
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://images-blend.herokuapp.com/");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //      {"ETH":
        //          {"USD":
        //              {
        //                  ...,
        //                  "VOLUME24HOUR": xxx.xxx,
        //                  ...
        //              }
        //          }
        //      }
        //  }
        
        // {
        //     "IPFS_HASH": "UcJmG9EmhAnHiAybVQyEdmLaC4TRT6jqBaNBSgsQyCM4"
        // }
        request.add("path", "IPFS_PATH");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        /*int timesAmount = 10**18;
        request.addInt("times", timesAmount);*/
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, bytes32 _volume) public recordChainlinkFulfillment(_requestId) returns (bytes32 requestId)
    {
        volume = _volume;

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillSecondRequest.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://images-blend.herokuapp.com/second");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //      {"ETH":
        //          {"USD":
        //              {
        //                  ...,
        //                  "VOLUME24HOUR": xxx.xxx,
        //                  ...
        //              }
        //          }
        //      }
        //  }
        
        // {
        //     "IPFS_HASH": "UcJmG9EmhAnHiAybVQyEdmLaC4TRT6jqBaNBSgsQyCM4"
        // }
        request.add("path", "IPFS_PATH");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        /*int timesAmount = 10**18;
        request.addInt("times", timesAmount);*/
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
 
    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract

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

    function setTokenURI(string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), uniqueTokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(uniqueTokenId, _tokenURI);
        uniqueTokenId++;
    }
}