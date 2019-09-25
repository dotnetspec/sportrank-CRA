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

  export const newRankingSendToContract = async (usernameHash, newrankId, updatedImageHash) => {
    //NB: this might be just web3.selectedAddress; outside of local test environment
    const account = web3.givenProvider.selectedAddress;
    DSportRank.methods.editAccount(usernameHash, '', '', '', newrankId, updatedImageHash).estimateGas({from: account})
    .then(function(gasAmount){
      const newRanking =  DSportRank.methods.editAccount(usernameHash, '', '', '', newrankId, updatedImageHash);
      newRanking.send({
        from: account, gas: gasAmount + 1000
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
    })
    .catch(function(error){
        console.log('error', error)
    });
}
