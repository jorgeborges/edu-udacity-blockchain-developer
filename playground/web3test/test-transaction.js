const Web3 = require('web3');
const EthereumTransaction = require('ethereumjs-tx');
require('dotenv').config();

(async () => {
  const web3 = new Web3('http://127.0.0.1:7545');

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
    nonce: 5,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: Number(web3.utils.toWei('1', 'ether')),
    data: '0x',
  };

  // create and sign transaction
  console.log('\nCreating and signing TX...');
  const privateKeySender = process.env.ETH_ACCOUNT_1_PRIV_KEY;
  const privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
  const transaction = new EthereumTransaction.Transaction(rawTx);
  transaction.sign(privateKeySenderHex);

  // serialize tx and send to ethereum network
  console.log('Send TX to network...');
  const serializedTx = transaction.serialize();
  await web3.eth.sendSignedTransaction(serializedTx);
  console.log('TX sent to network!');
})();
