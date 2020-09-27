const Web3 = require('web3');
require('dotenv').config();

(async () => {
  const web3 = new Web3(process.env.NETWORK_GANACHE_URL);

  const sendingAddress = '0x48cccdcef9b1928814a770b56059b5BBEF1D726D';
  const receivingAddress = '0x7e25C8053507beebb9E2418FA44c15655eD7ed53';

  // Check account balances
  console.log('=== TX TESTING ===\n')
  console.log(`Sending Account ${sendingAddress}`);
  console.log(`ETH Balance: ${web3.utils.fromWei(await web3.eth.getBalance(sendingAddress))}`)
  console.log(`Receiving Account ${receivingAddress}`);
  console.log(`ETH Balance: ${web3.utils.fromWei(await web3.eth.getBalance(receivingAddress))}`)

  // Build raw transaction
  const rawTx = {
    to: receivingAddress,
    gasPrice: 20000000,
    gas: 30000,
    value: Number(web3.utils.toWei('1', 'ether')),
    data: '0x',
  };

  // create and sign transaction
  console.log('\nCreating and signing TX...');
  const signedTx = await web3.eth.accounts.signTransaction(rawTx, process.env.ETH_ACCOUNT_GANACHE_0_PRIV_KEY);

  // serialize tx and send to ethereum network
  console.log('Sending TX to network...');
  const response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('TX sent to network!');
})();
