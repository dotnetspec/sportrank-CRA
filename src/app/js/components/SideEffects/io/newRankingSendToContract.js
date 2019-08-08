import DSportRank from '../../../../../ABIaddress';
//import { getWeb3defaultAccount } from './web3defaultAccount';
import {getWeb3Accounts} from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
  export const newRankingSendToContract = async (gasEstimate, usernameHash, updatedDescription, newrankId, updatedImageHash) => {
    const account = await getWeb3Accounts();
    const newRanking = await DSportRank.methods.editAccount(usernameHash, updatedDescription, newrankId, updatedImageHash);
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    newRanking.send({
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
