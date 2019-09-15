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

  export const newRankingSendToContract = async (gasEstimate, usernameHash, updatedContactno, updatedEmail, updatedDescription, newrankId, updatedImageHash) => {
    //const account = await getWeb3Accounts();
    //NB: this might be just web3.selectedAddress; outside of local test environment
    const account = web3.givenProvider.selectedAddress;
    console.log('account', account)
    const newRanking = await DSportRank.methods.editAccount(usernameHash, updatedContactno, updatedEmail, updatedDescription, newrankId, updatedImageHash);

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
      //return receipt;
      //console.log('confirmationNumber', confirmationNumber);
    })
}
