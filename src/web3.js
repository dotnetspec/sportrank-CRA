import Web3 from 'web3';

var web3 = new Web3(window.ethereum);

// if (typeof window.ethereum !== 'undefined'
// || (typeof window.web3 !== 'undefined')) {
//   console.log('typeof window.ethereum', typeof window.ethereum)
//   console.log('typeof window.web3', typeof window.web3)
//   // Web3 browser user detected. You can now use the provider.
//   const provider = window['ethereum'] || window.web3.currentProvider
//   web3 = provider;
//   console.log('web 3 is ', web3)
// }
//   console.log('web 3 is now', web3.selectedAddress)



//import React from 'React';
//import ganache from 'ganache-cli'
// use the given Provider, e.g in the browser with Metamask,
//or instantiate a new websocket provider
//const Web3 = require("web3");

//NB: tests don't work with Web3.givenProvider. Will defer to rinkeby.infura node
//const web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546' || 'https://localhost:8546', null, {});
//const web3 = new Web3('ws://localhost:8546', null, {});
//const web3 = new Web3(ganache.provider());

// const provider = ganache.provider()
// const OPTIONS = {
//   defaultBlock: "latest",
//   transactionConfirmationBlocks: 1,
//   transactionBlockTimeout: 5
// };
// const web3 = new Web3(provider, null, OPTIONS);

//const web3 = new Web3(Web3.givenProvider);
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// async function init() {
//   if (typeof web3 !== 'undefined') {
//     console.log('Web3 found');
//     //window.web3 = new Web3(web3.currentProvider);
//     //web3.eth.defaultAccount = await web3.eth.getAccounts[0];
//     const arr = await web3.eth.getAccounts();
//     web3.eth.defaultAccount = arr[0];
//     console.log('web3.eth.defaultAccount',  web3.eth.defaultAccount);
//   } else {
//      console.error('web3 was undefined');
//   }
// }
// init();

window.addEventListener('load', async () => {
  // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          try {
              // Request account access if needed
              console.log('here')
              web3 = await window.ethereum.enable();
              // Acccounts now exposed
              //web3.eth.sendTransaction({/* ... */});
              //const bal = await window.web3.eth.getBalance('0xAC5491BB066c98fec13046928a78761c0B1E5603')
              //web3 = window.web3;
              const bal = await window.web3.eth.getBalance("0x283C2d3800151F1E3db1F2C32c37e296b9db0834")
              console.log('bal', bal)
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
          //web3.eth.sendTransaction({/* ... */});
          const bal = web3.eth.getBalance("0xAC5491BB066c98fec13046928a78761c0B1E5603")
          console.log('bal', bal)
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
});

export default web3;


// async function getAccts(){
//     //const Web3 = require("web3");
//     //var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//     const result = await web3.eth.getAccounts()
//     console.log('local accounts', result)
//     const result2 = await web3.eth.accounts.hashMessage("Hello World")
//     console.log('hashed msg', result2)
//     }
//getAccts();



//going through the MM docs:
//window = browser. brower must be running ...

//enableEthereum();

//const enableEthereum () async  => {
//   export async function enableEthereum() {
//     console.log('in enableEthereum')
//     await window.ethereum.enable();
//   if (typeof window.ethereum !== 'undefined') {
//     console.log('you have an etherem compatible browser')
//     if(window.ethereum.isMetaMask){
//       console.log('you have MM in the browser')
//       console.log('ethereum.networkVersion',  window.ethereum.networkVersion)
//       console.log('window[ethereum].networkVersion',  window['ethereum'].networkVersion)
//
//       console.log('ethereum.selectedAddress', window.ethereum.selectedAddress)
//       return 'return from enableEthereum';
//       //window.ethereum.enable();
//       //window.reload();
//       }
//   };
// }
//REVIEW: possibly use as reconnecting code - needs refactor?
// const RINKEBY_WSS = "wss://rinkeby.infura.io/ws";
// const GIVENPROVIDER = Web3.givenProvider;
// //const LOCALHOSTWS = "'ws://localhost:8546', null, {}'"
// var provider = new Web3.providers.WebsocketProvider(GIVENPROVIDER);
//   //|| RINKEBY_WSS);
//   // || LOCALHOSTWS);
// var web3 = new Web3(provider);
//
// provider.on('error', e => console.log('WS Error', e));
// provider.on('end', e => {
//     console.log('WS closed');
//     console.log('Attempting to reconnect...');
//     provider = new Web3.providers.WebsocketProvider(GIVENPROVIDER);
//       //|| RINKEBY_WSS);
//       //|| LOCALHOSTWS);
//
//     provider.on('connect', function () {
//         console.log('WSS Reconnected');
//     });
//
//     web3.setProvider(provider);
// });
