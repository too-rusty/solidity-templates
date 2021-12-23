const Price = artifacts.require("Price");

module.exports = async (deployer) => {
  try {
    deployer.deploy(Price);
    const priceContract = await Price.deployed()
    console.log(`price contract deployed at ${priceContract.address}`)
  } catch (e) {
    console.log(e)
  }
};
