import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';
//import { getWeb3defaultAccount } from './web3defaultAccount';
//import {getWeb3Accounts} from './web3Accounts';

//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
//NB: this functionality NOT currently being used!
  export const updateUserSendToContract = async (gasEstimate, address, updatedContactno, updatedEmail, updatedDescription, rankId, updatedImageHash) => {
//export async function updateUserSendToContract(gasEstimate, updatedDescription, rankId, updatedImageHash){
  try{
    //const address = await getWeb3Accounts();
    //const usernameHash = await DSportRank.methods.owners(address[0]).call();
    //const { address } = props.account;
    const usernameHash = await DSportRank.methods.owners(address).call();
    //console.log('address', address);
    // get user details from contract
    //const user = await DSportRank.methods.users(usernameHash).call();
     console.log('usernameHash', usernameHash)
    // console.log('updatedDescription', updatedDescription)
    // console.log('rankId', rankId)
    // console.log('updatedImageHash', updatedImageHash)
    //const gasEstimate = await DSportRank.methods.editAccount.estimateGas({ from: web3.eth.defaultAccount, gas: 10000000000 });
    const newUserAccountDetails = await DSportRank.methods.editAccount(usernameHash, updatedContactno, updatedEmail, updatedDescription, rankId, updatedImageHash);
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    //console.log('newUserAccountDetails', newUserAccountDetails)
    newUserAccountDetails.send({
      from: address, gas: gasEstimate + 100000
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
