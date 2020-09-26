const Web3 = require('web3');
require('dotenv').config();

(async () => {
  const web3 = new Web3(process.env.NETWORK_ROPSTEN_URL);

  const sendingAddress = '0x5569140f076D5E0b50b73D3a3930D82f2E0b8534';
  const receivingAddress = '0x4b3e3eF2b08918e07354c3a35d2640A8bEb61765';

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
    gas: 21000,
    value: Number(web3.utils.toWei('0.5', 'ether')),
    data: '0x',
    chain: 'ropsten',
    hardfork: 'petersburg',
  };

  // create and sign transaction
  console.log('\nCreating and signing TX...');
  const signedTx = await web3.eth.accounts.signTransaction(rawTx, process.env.ETH_ACCOUNT_MM_ALPHA_PRIV_KEY);

  // serialize tx and send to ethereum network
  console.log('Sending TX to network...');
  const response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('TX sent to network!');
})();
