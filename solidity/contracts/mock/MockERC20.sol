// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockERC20
 *
 * @dev A mintable ERC20 token contract for testing. Anyone can mint or burn. DO NOT
 * use it for production.
 */
contract MockERC20 is ERC20 {

    constructor(string memory _name, string memory _symbol,uint256 amount,uint8 decimals) 
        public ERC20(_name, _symbol) {

        _setupDecimals(decimals);
        _mint(msg.sender, amount);
    
    }

}
