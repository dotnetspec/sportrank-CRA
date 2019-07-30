import DSportRank from '../../../../../ABIaddress';
import { getWeb3defaultAccount } from './web3defaultAccount';
import {getWeb3Accounts} from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
//This function returns a tx hash:
  export const challengeSendToContract = async (gasEstimate, challengeState) => {
    const challenge = await DSportRank.methods.challenge(challengeState);
    return await challenge.send({ from: await getWeb3Accounts(), gas: gasEstimate + 100000 });
}
