pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token0 is ERC20 {
    constructor() ERC20("Token0", "TK0") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}


contract Token1 is ERC20 {
    constructor() ERC20("Token1", "TK1") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}


contract Token2 is ERC20 {
    constructor() ERC20("Token2", "TK2") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}