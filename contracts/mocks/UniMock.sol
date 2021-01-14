// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UniMock is ERC20 {
    constructor() ERC20("Uniswap Mock", "UNI") {}

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }
}