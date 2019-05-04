import Web3 from 'web3';

//const Web3 = require("web3");
const Web3HDWalletProvider = require("web3-hdwallet-provider");
const mnemonic = "blind vendor near grace hover video merit hint brave ticket man awkward";
// 12 word mnemonic

//var httpProvider = new Web3.providers.HttpProvider('http://rinkeby.infura.io/964a8fdda64246719dc7ba8cbf301cc7');
//web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/YOUR_TOKEN_HERE"));
//var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/964a8fdda64246719dc7ba8cbf301cc7"));
//var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/2aedeee53e7045dab6ba746f85a312d1"));
//var httpProvider = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/964a8fdda64246719dc7ba8cbf301cc7"))

//let web3 = httpProvider;

//let web3 = new Web3HDWalletProvider(mnemonic, httpProvider);
// Or, alternatively pass in a zero-based address index.

//below passes Enzyme tests but doesn't work in browser
// var httpProvider = new Web3.providers.HttpProvider('http://rinkeby.infura.io/964a8fdda64246719dc7ba8cbf301cc7');
// var provider = new Web3HDWalletProvider(mnemonic, httpProvider, 5);
// const web3 = new Web3(provider);
//below works for 1 account only (but doesn't currently pass Enzyme tests)
const web3 = new Web3(window.web3.currentProvider, mnemonic);

// if(typeof web3 != 'undefined'){
//      console.log("Using web3 detected from external source like Metamask")
//      web3 = new Web3(web3.currentProvider)
//   }else{
//      //const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//      web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/964a8fdda64246719dc7ba8cbf301cc7"))
//
//   }
//console.log('web3', web3)

export default web3;
