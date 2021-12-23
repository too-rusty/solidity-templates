const Token2 = artifacts.require("Token2");

module.exports = async (deployer) => {
  try {
    deployer.deploy(Token2);
    const token2 = await Token2.deployed();
    console.log(`token2 contract deployed at ${token2.address}`)
  } catch (e) {
    console.log(e)
  }
};
