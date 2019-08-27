import DSportRank from '../../../../../ABIaddress';
//import { getWeb3defaultAccount } from './web3defaultAccount';
import {getWeb3Accounts} from './web3Accounts';
import JSONops from '../../Logic/JSONops'
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
  export const challengeSendToContract = async (gasEstimate, challengeState, newrankId, user, selectedOpponentName, data) => {
    console.log('gasEstimate', gasEstimate)
    const account = await getWeb3Accounts();
    const challenge = await DSportRank.methods.challenge(challengeState);
    //return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
    try{
          challenge.send({
            from: account[0], gas: gasEstimate + 100000
          })
          .on('transactionHash', function(hash){
              JSONops._updateDoChallengeJSON(newrankId, user, selectedOpponentName, data);
              console.log('hash', hash);
          })
          .on('receipt', function(receipt){
              console.log('receipt', receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){
            //console.log('confirmationNumber', confirmationNumber);
          })
        }  catch(err){
            console.log('err inside challengeSendToContract')
            console.log(err)
            // remove loading state and show error message
            //setState({ isLoading: false, error: err.message });
            //setIsLoading(false);
            //setError(err.message)
          }
}
