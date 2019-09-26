import Web3 from 'web3';
//NB: to change network change contract address in ABIaddress ...
//REVIEW: not sure if addEventListener will be used ...
//window.addEventListener('load', async () => {
// Modern dapp browsers...
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    // Acccounts now exposed
    //inconsistent display of below, unsure why ...
    if (window.ethereum.isMetaMask) {
      console.log('you have MM in the browser')
    }
    console.log('ethereum.networkVersion', window.ethereum.networkVersion)
    console.log('window[ethereum].networkVersion', window['ethereum'].networkVersion)
    console.log('ethereum.selectedAddress', window.ethereum.selectedAddress)
    // //using web3 (not ethereum)
    // console.log('window.web.selectedAddress', window.web3.givenProvider.selectedAddress)
  } catch (error) {
    // User denied account access...
    console.log('Account access has been denied')
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  console.log('NB: Using a legacy dapp browser!')
  window.web3 = new Web3(window.web3.currentProvider);
}
// Non-dapp browsers...like the unit test 'browser'
else {
  //below log relevant outside local
  //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //below necessary for local tests
  //console.log('NB: Test Environment - Ganache GUI')
  //window.web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546' || 'https://localhost:8546', null, {});
  window.web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545' || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546' || 'https://localhost:8546', null, {});
}
//});

export default window.web3;
