
const Token1 = artifacts.require("Token1");


module.exports = async (deployer) => {
  try {
    
    deployer.deploy(Token1);
    const token1 = await Token1.deployed()
    console.log(`token1 contract deployed at ${token1.address}`)
    
  } catch (e) {
    console.log(e)
  }
};
