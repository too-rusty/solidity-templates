// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Price {
    address FACTORY;

    constructor(){
        //set factory
        FACTORY = 0x6725F303b657a9451d8BA641348b6761A6CC7a17; // testnet pcs factory
    }

    // ensure pairing between tokens
    function getPrice(uint256 amountA, address[] calldata path) external view returns (uint256 amount) {
        require(path.length >= 2, "invalid number of params in path");
        // 
        // tokenA, WBNB, tokenB -> if there is no pair between tokenA and tokenB
        amount = amountA;
        for(uint i = 1; i < path.length; i++) {
            (uint256 reserveA, uint256 reserveB) = getReserves(path[i-1], path[i]);
            require(reserveA > 0, "Pair Non Existent || No Liquidity");
            amount = quote(amount, reserveA, reserveB);
        }
    }

    // INTERNAL FUNCTIONS
    function getReserves(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (reserveA, reserveB) = PancakeLibrary.getReserves(FACTORY, tokenA, tokenB);
    }

    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'PancakeLibrary: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'PancakeLibrary: INSUFFICIENT_LIQUIDITY');
        amountB = ( amountA * reserveB ) / reserveA;
    }

}

interface IPancakePair {
  function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IUniswapV2Factory {
  function getPair(address tokenA, address tokenB) external view returns (address pair);
}

library PancakeLibrary {

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'PancakeLibrary: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'PancakeLibrary: ZERO_ADDRESS');
    }

    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IPancakePair(pair).getReserves();

        (address token0, ) = sortTokens(tokenA, tokenB);
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }

}