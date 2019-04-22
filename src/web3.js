import Web3 from 'web3';

//const Web3 = require("web3");
const Web3HDWalletProvider = require("web3-hdwallet-provider");
const mnemonic = "blind vendor near grace hover video merit hint brave ticket man awkward";
// 12 word mnemonic

//var httpProvider = new Web3.providers.HttpProvider('http://rinkeby.infura.io/964a8fdda64246719dc7ba8cbf301cc7');
//web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/YOUR_TOKEN_HERE"));
//var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/964a8fdda64246719dc7ba8cbf301cc7"));
//var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/2aedeee53e7045dab6ba746f85a312d1"));
var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/964a8fdda64246719dc7ba8cbf301cc7"))



var provider = new Web3HDWalletProvider(mnemonic, httpProvider);
// Or, alternatively pass in a zero-based address index.
//var provider = new Web3HDWalletProvider(mnemonic, httpProvider, 5);

//const web3 = new Web3(provider);
const web3 = new Web3(window.web3.currentProvider);

export default web3;
