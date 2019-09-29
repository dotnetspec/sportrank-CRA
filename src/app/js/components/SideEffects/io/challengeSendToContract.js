import DSportRank from '../../../../../ABIaddress';
//import { getWeb3defaultAccount } from './web3defaultAccount';
//import {getWeb3Accounts} from './web3Accounts';
import JSONops from '../../Logic/JSONops'
import web3 from '../../../../../web3';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
  export const challengeSendToContract = async (challenge, newrankId, user, selectedOpponentName, data) => {

    //const account = await getWeb3Accounts();
    //const account = web3.givenProvider.selectedAddress;
    // const challenge = await DSportRank.methods.challenge(challengeState, newrankId, user, selectedOpponentName, data);
    // //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    // try{
    //       challenge.send({
    //         from: account, gas: gasEstimate + 100000
    //       })
    //       .on('transactionHash', function(hash){
    //           JSONops._updateDoChallengeJSON(newrankId, user, selectedOpponentName, data);
    //           console.log('hash', hash);
    //       })
    //       .on('receipt', function(receipt){
    //           console.log('receipt', receipt);
    //       })
    //       .on('confirmation', function(confirmationNumber, receipt){
    //         //console.log('confirmationNumber', confirmationNumber);
    //       })
    //     }  catch(err){
    //         console.log('err inside challengeSendToContract')
    //         console.log(err)
    //         // remove loading state and show error message
    //         //setState({ isLoading: false, error: err.message });
    //         //setIsLoading(false);
    //         //setError(err.message)
    //       }

          //looks, from contract, like we don't need to provide an address (but we do for gas estimate)
          // const account = web3.givenProvider.selectedAddress;
          // const usernameHash = await DSportRank.methods.owners(account).call();
          // get user details from contract
           //console.log('usernameHash', usernameHash)

          const account = web3.givenProvider.selectedAddress;
          DSportRank.methods.challenge(challenge).estimateGas({from: account})
          .then(function(gasAmount){
            const challengeMethod =  DSportRank.methods.challenge(challenge);
            challengeMethod.send({
              from: account, gas: gasAmount + 1000
            })
            .on('transactionHash', function(hash){
                console.log('hash', hash);
                JSONops._updateDoChallengeJSON(newrankId, user, selectedOpponentName, data);
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
