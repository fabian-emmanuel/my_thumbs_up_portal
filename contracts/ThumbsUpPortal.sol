// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ThumbsUpPortal {
    uint256 totalThumbsUp;
    uint256 private seed;

    event NewThumbsUp(address indexed from, uint256 timestamp, string message);

    struct ThumbsUp {
        address thumbsUper; // The address of the user who made a thumbsUp.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user made the thumbsUp.
    }

    ThumbsUp[] thumbsUps;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user gave a thumbsUp at us.
     */
    mapping(address => uint256) public lastThumbsUpAt;

    constructor() payable {
        console.log("We have been constructed!");

        /*
         * Set the initial seed
         */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function thumbsUp(string memory _message) public {

        require(
            lastThumbsUpAt[msg.sender] + 30 seconds < block.timestamp,
            "Must Wait For 30secs Before sending another thumbsUp!"
        );
        /*
         * Update the current timestamp we have for the user
         */
        lastThumbsUpAt[msg.sender] = block.timestamp;

        totalThumbsUp += 1;
        console.log("%s has sent a ThumbsUp! And left the message: %s", msg.sender, _message);

        thumbsUps.push(ThumbsUp(msg.sender, _message, block.timestamp));

        /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);
        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            /*
             * The same code we had before to send the prize.
             */
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

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
