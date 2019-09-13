import web3 from '../../../../../web3';
//import Web3 from 'web3';
//this may appear unnecessary but it's done to
//enable mocking:
    //export const getWeb3defaultAccount  = () => {
      export async function getWeb3defaultAccount(){
        //export async function getWeb3defaultAccount(){
      //return '0x847700B781667abdD98E1393420754E503dca5b7';
    //return web3.eth.getAccounts((error, accounts) => console.log(accounts[0]));
      //return web3.eth.defaultAccount;
      //const accts = await web3.eth.getAccounts();
      //console.log(accts[0])
      //return web3.accounts[0];
      // window.ethereum.enable();
      // window.web3 = new Web3(window.ethereum);
      // return window.ethereum.selectedAddress;
      console.log('defaultAccount', web3)
      //return await web3.eth.defaultAccount;
      //return await web3.eth.selectedAddress;
      
      //below works in app.js but not in the tests
      //web3.givenProvider.selectedAddress
      return  web3.selectedAddress;

      // const userAccountsArray = await web3.eth.getAccounts();
      //   console.log('getWeb3defaultAccount after await', userAccountsArray[0])
      // return userAccountsArray[0];
    }
