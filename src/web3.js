import Web3 from 'web3';
// use the given Provider, e.g in the browser with Metamask,
//or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {});

export default web3;
