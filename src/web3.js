import Web3 from 'web3';
// use the given Provider, e.g in the browser with Metamask,
//or instantiate a new websocket provider

//NB: tests don't work with Web3.givenProvider. Will defer to rinkeby.infura node
const web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546', null, {});

//going through the MM docs:
//window = browser. brower must be running ...
if (typeof window.ethereum !== 'undefined') {
  console.log('you have an etherem compatible browser')
  if(window.ethereum.isMetaMask){
    console.log('you have MM in the browser')
    console.log('ethereum.networkVersion',  window.ethereum.networkVersion)
    console.log('ethereum.selectedAddress', window.ethereum.selectedAddress)
    window.ethereum.enable();
    //window.reload();
    }
};
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


export default web3;
