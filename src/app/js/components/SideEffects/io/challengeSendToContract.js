import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
import { getWeb3defaultAccount } from './web3defaultAccount';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
      //export async function challengeSendToContract(gasEstimate, challengeState){
        export const challengeSendToContract = (gasEstimate, challengeState) => {
        //return await web3.eth.sendTransaction({ from: await getWeb3Accounts(), to: '0xAC5491BB066c98fec13046928a78761c0B1E5603', value: 1**17, gas: gasEstimate + 1000 });
        const challenge = DSportRank.methods.challenge(challengeState);
        //return await challenge.send({ from: getWeb3Accounts(), gas: gasEstimate + 100000 });
        return challenge.send({ from: getWeb3defaultAccount(), gas: gasEstimate + 100000 });
    }
