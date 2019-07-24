import web3 from '../../../../../web3';
//import { getDefaultUserAccountFromAddress } from '../io/web3io';
//import  *  as web3defaultAccount from '../io/web3defaultAccount';
import { getWeb3defaultAccount } from './web3defaultAccount';
//this may appear unnecessary but it's done to
//enable mocking:
      export async function estimateGas(){

      // const userAccountsArray = await web3.eth.getAccounts();
      //   console.log('getWeb3defaultAccount after await', userAccountsArray[0])
      // return userAccountsArray[0
      console.log('estimateGas', estimateGas)
        return await web3.eth.estimateGas({ from: getWeb3defaultAccount()});

    }
