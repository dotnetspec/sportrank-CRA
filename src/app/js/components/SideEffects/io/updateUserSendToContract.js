import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';

//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
//NB: this functionality NOT currently being used!
  export const updateUserSendToContract = async (address, updatedContactno, updatedEmail, updatedDescription, rankId, updatedImageHash) => {
    const usernameHash = await DSportRank.methods.owners(address).call();
    // get user details from contract
     console.log('usernameHash', usernameHash)

    const account = web3.givenProvider.selectedAddress;
    DSportRank.methods.editAccount(usernameHash, updatedContactno, updatedEmail, updatedDescription, rankId, updatedImageHash).estimateGas({from: account})
    .then(function(gasAmount){
      const userUpdate =  DSportRank.methods.editAccount(usernameHash, updatedContactno, updatedEmail, updatedDescription, rankId, updatedImageHash);
      userUpdate.send({
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
