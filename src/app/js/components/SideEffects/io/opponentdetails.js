import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';

  export const opponentdetails = async (opponentaddress) => {
          //looks, for contract, like we don't need to provide an address (but we do for gas estimate)
          const account = web3.givenProvider.selectedAddress;
          //DSportRank.methods.challenge(challenge).estimateGas({from: account})
          console.log('acct', account, 'address', opponentaddress)

          DSportRank.methods.owners(opponentaddress).call()
          .then(function(gasAmount){
            const ownerhash =  DSportRank.methods.owners(opponentaddress).call();
            ownerhash.send({
              from: account, gas: gasAmount + 1000
            })
            .on('transactionHash', function(hash){
                console.log('hash', hash);
                DSportRank.methods.users(hash).call();
            })
            .on('receipt', function(receipt){
                console.log('receipt', receipt);
                return receipt;
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
