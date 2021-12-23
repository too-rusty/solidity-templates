

const Router = artifacts.require("IUniswapV2Router01")
const Token = artifacts.require("Token0")
const Price = artifacts.require("Price")

const token0_addr = "0x849E632df5F91c5382AdcDf6a554B48698D0fC48"
const token1_addr = "0x5AFd01801D8e8782743E11eAED7A5a6356Ea022f"
const token2_addr = "0x7e4851367f502dd761e49580311704eBf414c461"
const price_addr = "0xa158a16e741CfdB2793dC360C9bdb47503513EbC"
const router_addr = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1" // testnet pcs router

const fromWei = (x) => { return web3.utils.fromWei(x,"ether") }
const toWei = (x) => { return web3.utils.toWei(x,"ether") }

module.exports = async (done) => {
    // function addLiquidity(
    //     address tokenA,
    //     address tokenB,
    //     uint amountADesired,
    //     uint amountBDesired,
    //     uint amountAMin,
    //     uint amountBMin,
    //     address to,
    //     uint deadline
    // ) external returns (uint amountA, uint amountB, uint liquidity);

    const router = await Router.at(router_addr)
    const token0 = await Token.at(token0_addr)
    const token1 = await Token.at(token1_addr)
    const token2 = await Token.at(token2_addr)
    const price = await Price.at(price_addr)
    const [admin] = await web3.eth.getAccounts()
    
    console.log(`admin: ${admin}`)
    console.log(`token0 symbol, token1 symbol, token2 symbol: ${await token0.symbol()} , 
        ${await token1.symbol()}, ${await token2.symbol()}\n`)

    try {
        await token0.approve(router_addr, toWei("100"))
        await token1.approve(router_addr, toWei("200"))
        console.log(`approved`)
        await router.addLiquidity(token0_addr, token1_addr, toWei("100"), toWei("200"), 0, 0, admin, Math.floor(Date.now() / 1000) + 10)
        console.log(`LP added for token0, token1`)
    } catch (e) {
        console.log(e)
    }

    try{
        await token1.approve(router_addr, toWei("200"))
        await token2.approve(router_addr, toWei("400"))
        console.log(`approved`)
        await router.addLiquidity(token1_addr, token2_addr, toWei("200"), toWei("400"), 0, 0, admin, Math.floor(Date.now() / 1000) + 10)
        console.log(`LP added for token1, token2`)
    } catch (e) {
        console.log(e)
    }
    
    try {
        const rate = await price.getPrice(toWei("100"), [token0_addr, token1_addr, token2_addr])
        console.log(`price of token ${fromWei(rate)}`)
    } catch (e) {
        console.log(e)
    }

    done()
}

// NEVER FORGET TO APPROVE