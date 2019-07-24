import web3 from '../../../../../web3';
//this may appear unnecessary but it's done to
//enable mocking:
    //export const getWeb3defaultAccount  = () => {
      export async function getWeb3defaultAccount(){
        //export async function getWeb3defaultAccount(){
      //return '0x847700B781667abdD98E1393420754E503dca5b7';
    //return web3.eth.getAccounts((error, accounts) => console.log(accounts[0]));
      return web3.eth.defaultAccount;
      //console.log('defaultAccount', web3.eth.defaultAccount)
      //return web3.eth.defaultAccount;
      //return web3.eth.getAccounts[0];

      // const userAccountsArray = await web3.eth.getAccounts();
      //   console.log('getWeb3defaultAccount after await', userAccountsArray[0])
      // return userAccountsArray[0];
    }
