const Token0 = artifacts.require("Token0");

module.exports = async (deployer) => {
  try {
    deployer.deploy(Token0);
    const token0 = await Token0.deployed()
    console.log(`token0 contract deployed at ${token0.address}`)
  } catch (e) {
    console.log(e)
  }
};
