import web3 from '../../../../../web3';
//import { getDefaultUserAccountFromAddress } from '../io/web3io';
//import  *  as web3defaultAccount from '../io/web3defaultAccount';
//import { getWeb3defaultAccount } from './web3defaultAccount';
import { getWeb3Accounts } from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
      export async function sendEthTransaction(gasEstimate){
        return await web3.eth.sendTransaction({ from: await getWeb3Accounts(), to: '0xAC5491BB066c98fec13046928a78761c0B1E5603', value: 1**17, gas: gasEstimate + 1000 });
    }
