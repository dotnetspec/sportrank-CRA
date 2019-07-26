import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
//import { getDefaultUserAccountFromAddress } from '../io/web3io';
//import  *  as web3defaultAccount from '../io/web3defaultAccount';
import { getWeb3defaultAccount } from './web3defaultAccount';
//import { getWeb3Accounts } from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
      export async function challengeSendToContract(gasEstimate, challengeState){
        //return await web3.eth.sendTransaction({ from: await getWeb3Accounts(), to: '0xAC5491BB066c98fec13046928a78761c0B1E5603', value: 1**17, gas: gasEstimate + 1000 });
        const challenge = DSportRank.methods.challenge(challengeState);
        //return await challenge.send({ from: getWeb3Accounts(), gas: gasEstimate + 100000 });
        return await challenge.send({ from: getWeb3defaultAccount(), gas: gasEstimate + 100000 });
    }
