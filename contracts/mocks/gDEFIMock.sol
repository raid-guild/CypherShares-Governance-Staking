// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract gDEFIMock is ERC20 {
    constructor() ERC20("gDEFI Mock", "gDEFI") {}

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }
}