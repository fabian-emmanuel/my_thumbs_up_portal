// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ThumbsUpPortal {
    uint256 totalThumbsUp;

    event NewThumbsUp(address indexed from, uint256 timestamp, string message);

    /*
     * I created a struct here named ThumbsUp.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */
    struct ThumbsUp {
        address thumbsUper; // The address of the user who made a thumbsUp.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user made the thumbsUp.
    }

    /*
     * I declare a variable thumbsUps that lets me store an array of structs.
     * This is what lets me hold all the thumbsUps anyone ever sends to me!
     */
    ThumbsUp[] thumbsUps;


    constructor(){
        console.log("Yo i am a smart contract");
    }

    function thumbsUp(string memory _message) public {
        totalThumbsUp += 1;
        console.log("%s has sent a ThumbsUp! And left the message: %s", msg.sender, _message);

        thumbsUps.push(ThumbsUp(msg.sender, _message, block.timestamp));

        emit NewThumbsUp(msg.sender, block.timestamp, _message);
    }

    function getAllThumbsUps() public view returns (ThumbsUp[] memory){
        return thumbsUps;
    }

    function getTotalThumbsUps() public view returns (uint){
        console.log("The Total ThumbsUp so far is %s!", totalThumbsUp);
        return totalThumbsUp;
    }
}
