import DSportRank from '../../../../../ABIaddress';
//import { getWeb3defaultAccount } from './web3defaultAccount';
import {getWeb3Accounts} from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
  export const challengeSendToContract = async (gasEstimate, challengeState) => {
    console.log('gasEstimate', gasEstimate)
    const account = await getWeb3Accounts();
    const challenge = await DSportRank.methods.challenge(challengeState);
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    challenge.send({
      from: account, gas: gasEstimate + 1000
    })
    .on('transactionHash', function(hash){
        console.log('hash', hash);
    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      //console.log('confirmationNumber', confirmationNumber);
    })
}
