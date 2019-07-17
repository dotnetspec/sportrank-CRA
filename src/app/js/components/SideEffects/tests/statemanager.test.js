import 'jest-dom/extend-expect'
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import changeState from '../StateManager'

cleanup();


// User Account data:
//currently this is same for userAccountsArray and defaultUserAccount
//cos only one account coming through the from the BC
const userAccountsArray =
 [
     { address: '0x847700B781667abdD98E1393420754E503dca5b7',
       balance: 2.0,
       user: {
          username: 'player1',
          description: "test2",
          email: "test@test.com",
          owner: "0x847700B781667abdD98E1393420754E503dca5b7",
          picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          rankingDefault: "5c81c1e944e81057efe3e2c8"
       }
     }
   ];

   const userObj = {
             username: 'player1',
             description: "test2",
             email: "test@test.com",
             owner: '0x847700B781667abdD98E1393420754E503dca5b7',
             picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
             rankingDefault: "5c81c1e944e81057efe3e2c8"
        };

describe('StateManager tests', () => {
  it('changeState error if no state change sent',  () => {
    const state = {};
    //if there's no user account array then state
    //set to no existing user
    //for ref: changeState(stateToChange, state, userAccounts, defaultUserAccount)
    const newState = changeState('', state, [],[]);
    expect(newState.isCurrentUserActive).toBe(false);
    //expect(newState.error).toEqual('No state change has been sent');
   });

   it('noExistingUser',  () => {
     const state = {};
     state.rankingDefault = '12345678';
     state.isUserInJson =  true;
     state.isCurrentUserActive = true;
     const newState = changeState('noExistingUser', state,[],[])
     expect(newState.rankingDefault).toEqual('');
     expect(newState.isUserInJson).toBe(false);
     expect(newState.isCurrentUserActive).toBe(false);
    });

    it('setUserSelectedRanking',  () => {
      const state = {};
      state.newrankId = '12345678';
      const newState = changeState('setUserSelectedRanking', state,[],userAccountsArray)
      expect(newState.newrankId).toEqual('5c81c1e944e81057efe3e2c8');
     });

       it('assignUserAcctStateToStateObj',  () => {
         const state = {};
         state.newrankId = '12345678';
         const newState = changeState('assignUserAcctStateToStateObj', state, userAccountsArray, userAccountsArray)
         expect(newState.newrankId).toEqual('');
        });

 });
