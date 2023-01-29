//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Faucet {
  
  function withdraw(uint _amount) public {
    // users can only withdraw .1 ETH at a time!
    require(_amount <= 100000000000000000);
    payable(msg.sender).transfer(_amount);
  }

  // fallback function
  receive() external payable {}
}