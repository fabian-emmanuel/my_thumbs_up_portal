// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ThumbsUpPortal {
    uint totalThumbsUp;

    constructor(){
        console.log("Yo i am a smart contract");
    }

    function thumbsUp() public {
        totalThumbsUp += 1;
        console.log("%s has sent a ThumbsUp!", msg.sender);
    }

    function getTotalThumbsUp() public view returns (uint){
        console.log("The Total ThumbsUp so far is %s!", totalThumbsUp);
        return totalThumbsUp;
    }
}
