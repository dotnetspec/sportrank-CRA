import DSportRank from '../../../../../ABIaddress';
//import { getWeb3defaultAccount } from './web3defaultAccount';
//import {getWeb3Accounts} from './web3Accounts';
import web3 from '../../../../../web3';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash
//string contactno, string email,
  //export const newRankingSendToContract = async (gasEstimate, usernameHash, updatedDescription, newrankId, updatedImageHash) => {
  //const account = await getWeb3Accounts();
  //const newRanking = await DSportRank.methods.editAccount(usernameHash, updatedDescription, newrankId, updatedImageHash);

  export const newRankingSendToContract = async (gasEstimate, usernameHash, newrankId, updatedImageHash) => {
    //const account = await getWeb3Accounts();
    //NB: this might be just web3.selectedAddress; outside of local test environment
    const account = web3.givenProvider.selectedAddress;
    //console.log('account', account)
    //const newgasEstimate = await DSportRank.methods.editAccount.estimateGas({ from: account, gas: 10000000000 });
    //console.log('edit account params', '1', usernameHash, '2', updatedContactno, '3', updatedEmail, '4', updatedDescription, '5', newrankId, '6', updatedImageHash)
    const newRanking = await DSportRank.methods.editAccount(usernameHash, '', '', '', newrankId, updatedImageHash);
    //const transGasEstimate = await newRanking.gasEstimate();
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    newRanking.send({
      from: account, gas: gasEstimate + 100000
    })
    .on('transactionHash', function(hash){
        console.log('hash', hash);
    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      //return receipt;
      //console.log('confirmationNumber', confirmationNumber);
    })
}
