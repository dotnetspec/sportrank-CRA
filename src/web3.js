import Web3 from 'web3';
var web3 = {};
//NB: to change network change contract address in ABIaddress ...
//REVIEW: not sure if addEventListener will be used ...
//window.addEventListener('load', async () => {
// Modern dapp browsers...
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    if (window.ethereum.isMetaMask) {
      console.log('you have MM in the browser')
    }
    console.log('ethereum.networkVersion', window.ethereum.networkVersion)
    console.log('window[ethereum].networkVersion', window['ethereum'].networkVersion)
    console.log('ethereum.selectedAddress', window.ethereum.selectedAddress)
    // Acccounts now exposed
    web3 = window.web3;
  } catch (error) {
    // User denied account access...
    console.log('Account access has been denied')
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  console.log('NB: Using a legacy dapp browser!')
  window.web3 = new Web3(web3.currentProvider);
  web3 = window.web3;
}
// Non-dapp browsers...
else {
  //below log relevant outside local
  //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //below necessary for local tests
  web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546' || 'https://localhost:8546', null, {});
}
//});

export default web3;
