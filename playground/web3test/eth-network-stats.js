const Web3 = require('web3');
require('dotenv').config();

(async () => {
  const web3 = new Web3(process.env.NETWORK_GANACHE_URL);

  console.log('=== ETH Stats ===');
  console.log(`Gas price: ${await web3.eth.getGasPrice()}`);
  console.log(`Uncle block: ${(await web3.eth.getUncle(500, 0)).hash}`);
  console.log(`Latest block TX count: ${(await web3.eth.getBlockTransactionCount('latest'))}`);
  console.log(`Hello world account TX count: ${(await web3.eth.getTransactionCount('0xF9F2c0Aa275d2C4C355DdE08BDbb0a97b88BF783'))}`);
})();
