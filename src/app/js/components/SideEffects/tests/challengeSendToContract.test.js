import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
//use * as notation for the mockable functions:
import * as
challengeSendToContract
from '../io/challengeSendToContract';
//use {} notation for the function(s) importing
//that will test here
import {
  sendChallengeToContract
}
from '../../Logic/DoChallenge'

//const address = '0x847700B781667abdD98E1393420754E503dca5b7';
//This was just randomly picked from Etherscan:
const transactionHash = '0x3b208e2e7198d67705d90c3067902096c9f9297ad5f2e78195b6852d72090cbe'

describe('SideEffects/io/', () => {
  it('challengeSendToContract - mock check', async () => {
    //we're just mocking and returning the mocked result to learn input/outputs
    //but it'll then be ready for mocking elsewhere
    const spy = jest.spyOn(challengeSendToContract, 'challengeSendToContract');
    spy.mockReturnValue(transactionHash);
    //this is the function in DoChallenge:
    //REVIEW: it might be that can use challengeSendToContract directly
    //without using sendChallengeToContract as a separate function in
    //DoChallenge to enable testing ... to be seen ...
    //you have to use await here otherwise you'll just get a promise
    const txhashreturned = await sendChallengeToContract(53000, 'player1 vs player3');
    expect(spy).toHaveBeenCalled();
    expect(txhashreturned).toEqual(transactionHash);

    spy.mockRestore();
  });
});
