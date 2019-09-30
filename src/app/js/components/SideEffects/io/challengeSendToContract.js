import DSportRank from '../../../../../ABIaddress';
import JSONops from '../../Logic/JSONops'
import web3 from '../../../../../web3';

  export const challengeSendToContract = async (challenge, rankId, user, selectedOpponentName, data) => {
          //looks, for contract, like we don't need to provide an address (but we do for gas estimate)
          const account = web3.givenProvider.selectedAddress;
          DSportRank.methods.challenge(challenge).estimateGas({from: account})
          .then(function(gasAmount){
            const challengeMethod =  DSportRank.methods.challenge(challenge);
            challengeMethod.send({
              from: account, gas: gasAmount + 1000
            })
            .on('transactionHash', function(hash){
                console.log('hash', hash);
                JSONops._updateDoChallengeJSON(rankId, user, selectedOpponentName, data);
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
