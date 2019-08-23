
async function getAccts(){
    const Web3 = require("web3");
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const result = await web3.eth.getAccounts()
    console.log('local accounts', result)
    const result2 = await web3.eth.getAccount;
    console.log('web3.eth.defaultAccount', result2)
    //const result2 = await web3.eth.accounts.hashMessage("Hello World")
    //console.log('hashed msg', result2)
    }

getAccts();
