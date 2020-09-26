const Web3 = require('web3');


async function run() {
  const web3 = new Web3('http://127.0.0.1:7545');

  /** @type {Array} */
  const accounts = await web3.eth.getAccounts();

  console.log('The accounts: ', accounts);

  for (const account of accounts) {
    console.log(`For account ${account}`);
    const balance = await web3.eth.getBalance(account);
    console.log(`ETH Balance: ${web3.utils.fromWei(balance)}`)
    console.log('---')
  }
}

run();
