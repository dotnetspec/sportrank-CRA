import 'jest-dom/extend-expect'
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import ChangeState from '../../Logic/ChangeState'
import {userAccountsArray, userObj} from '../../../../../../cypress/fixtures/userAccounts'

cleanup();
// // User Account data:
// //currently this is same for userAccountsArray and defaultUserAccount
// //cos only one account coming through the from the BC

describe('ChangeState tests', () => {
it('doesUsernameExistInUserAccounts',  () => {
  //const state = {};
  let boolResult = ChangeState.isUserNameInDefaultUserAcct([]);
  expect(boolResult).toBe(false);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(userAccountsArray[0]);
  expect(boolResult).toBe(true);
 });

  it('status if no data sent to state',  () => {
    const state = {};
    //if there's no user account array then state
    //set to no existing user
    const newState = ChangeState.assignUserAcctStateToStateObj(state, [],{});
    expect(newState.userAccounts).toEqual([]);
    expect(newState.rankingDefault).toEqual('');
    expect(newState.isUserInJson).toBe(false);
    expect(newState.isCurrentUserActive).toBe(false);
    expect(newState.status).toEqual('There is no existing user');
   });

   it('noExistingUser',  () => {
     const state = {};
     state.rankingDefault = '12345678';
     state.isUserInJson =  true;
     state.isCurrentUserActive = true;
     const newState = ChangeState.noExistingUser(state,[],[])
     expect(newState.rankingDefault).toEqual('');
     expect(newState.isUserInJson).toBe(false);
     expect(newState.isCurrentUserActive).toBe(false);
    });

    it('setUserSelectedRanking',  () => {
      const state = {};
      state.newrankId = '12345678';
      const newState = ChangeState.setUserSelectedRanking(state, userAccountsArray[0])
      expect(newState.newrankId).toEqual('5c81c1e944e81057efe3e2c8');
     });

   it('assignUserAcctStateToStateObj',  () => {
     const state = {};
     state.newrankId = '12345678';
     const newState = ChangeState.assignUserAcctStateToStateObj(state, userAccountsArray, userAccountsArray[0])
     expect(newState.newrankId).toEqual('');
    });
 });
