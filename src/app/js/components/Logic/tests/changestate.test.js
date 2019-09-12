import 'jest-dom/extend-expect'
import ChangeState from '../../Logic/ChangeState'
import {userAccountsArray} from '../../../../../../cypress/fixtures/userAccounts'
import {userAccountsFromContractArr} from '../../../../../../cypress/fixtures/userAccountsFromContract'
import {cleanedUpSRContractData} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'

//cleanup();
// // User Account data:
// //currently this is same for userAccountsArray and defaultUserAccount
// //cos only one account coming through the from the BC

describe('ChangeState tests', () => {

//test using 'real' data from ganache:
  it('cleanUpUserSRAccountData',  () => {
    const retArr = ChangeState.cleanUpUserSRAccountData(userAccountsFromContractArr);
    expect(retArr[2].owner).toEqual('0xDdF507E108C94B0348fb42658D527e7EfD51672d');
    expect(retArr[2].username).toEqual('GanacheAcct3');
    expect(retArr[6].owner).toEqual('');
    expect(retArr[6].username).toEqual('Create New');
   });


it('doesUsernameExistInUserAccounts',  () => {
  //const state = {};
  let boolResult = ChangeState.isUserNameInDefaultUserAcct({});
  expect(boolResult).toBe(false);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[0]);
  expect(boolResult).toBe(true);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[1]);
  expect(boolResult).toBe(true);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[2]);
  expect(boolResult).toBe(true);
  //username is 'Create New'
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[3]);
  expect(boolResult).toBe(true);
  //if data hasn't been cleaned up there is no username
  //nb. using userAccountsFromContractArr here
  boolResult = ChangeState.isUserNameInDefaultUserAcct(userAccountsFromContractArr[3]);
  expect(boolResult).toBe(false);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[6]);
  expect(boolResult).toBe(true);
  boolResult = ChangeState.isUserNameInDefaultUserAcct(cleanedUpSRContractData[9]);
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
