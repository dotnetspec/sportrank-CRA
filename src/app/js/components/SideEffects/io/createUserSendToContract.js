import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';
//import { getWeb3defaultAccount } from './web3defaultAccount';
//import {getWeb3Accounts} from './web3Accounts';

//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
//NB: this functionality NOT currently being used!
  export const createUserSendToContract = async (address, username, contactno, email, description, rankId) => {
//export async function updateUserSendToContract(gasEstimate, updatedDescription, rankId, updatedImageHash){
  try{
    //don't need newRankId with a new user
    const createAccount = await DSportRank.methods.createAccount(username, contactno, email, description, rankId);
    console.log('createAccount created', createAccount)
    //gas estimate must be done here
    //const gasEstimate = await createAccount.estimateGas({ from: web3.eth.defaultAccount, gas: 10000000000 });
    //const gasEstimate = await createAccount.estimateGas({ from: await address, gas: 10000000000 });
    //let gasEstimate = await web3.eth.estimateGas({ from: await getWeb3defaultAccount()});
    let gasEstimate = await web3.eth.estimateGas({ from: await address});
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    console.log('createAccount abaout to send', createAccount)
    createAccount.send({
      from: address, gas: gasEstimate + 1000000
      //from: web3.eth.defaultAccount,  gas: gasEstimate + 1000
    })
    .on('transactionHash', function(hash){
        console.log('hash', hash);
    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log('confirmationNumber', confirmationNumber);
      console.log('receipt', receipt);
    })
  }catch(e){
    console.log(e)
  }
}
