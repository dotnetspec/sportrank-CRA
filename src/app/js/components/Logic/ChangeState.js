//import  {_sendJSONDataWithRankingID}  from '../SideEffects/io/Jsonio'
import { isEmpty } from '../../utils';
//TODO: refactor
const ChangeState = {

  /**
    Usage:
    if useful list functions and how to what they do
  */

  setUserSelectedRanking: function(state, defaultUserAccountObj){
    if(this.isUserNameInDefaultUserAcct(defaultUserAccountObj)){
      state.newrankId =  defaultUserAccountObj.user.rankingDefault;
      return state;
    }else{
      return this.noExistingUser(state, defaultUserAccountObj);
    }
  },

  isUserNameInDefaultUserAcct: function(defaultUserAccountObj){
    if(
      !isEmpty(defaultUserAccountObj)
      &&
      defaultUserAccountObj
      &&
      defaultUserAccountObj.username !== ''
    )
      {
        return true;
      }else{
        return false;
      }
  },

  cleanUpUserSRAccountData: function(userAccounts){
    if(userAccounts.length > 0){
      const processArray = (userAcct) => {
        const newObj = {};
        if(userAcct.username !== ''){
          //REVIEW: ensure the creationDate is correct with userAcct[0]?
          //for now a placeholder
          newObj.creationDate = '12345678';
          newObj.owner = userAcct[5];
          newObj.picture = userAcct[6];
          newObj.rankingDefault = userAcct[7];
          newObj.username =  userAcct.username;
          newObj.contactno =  userAcct.contactno;
          newObj.email =  userAcct.email;
          newObj.description =  userAcct.description;
      }else{
          newObj.creationDate = '12345678';
          newObj.owner = '';
          newObj.picture = '';
          newObj.rankingDefault = '';
          newObj.username =  'Create New';
          newObj.contactno =  '';
          newObj.email =  '';
          newObj.description =  '';
      }
        return newObj;
      }
      //const newArr = userAccounts.map(processArray);
      return userAccounts.map(processArray);
    }else{
      return null;
    }
  },

  assignUserAcctStateToStateObj: function(state, userAccounts, defaultUserAccountObj){
    if(this.isUserNameInDefaultUserAcct(defaultUserAccountObj) && userAccounts.length > 0){
      state.userAccounts =  userAccounts;
      state.user =  defaultUserAccountObj.user;
      state.contactno =  defaultUserAccountObj.user.contactno;
      state.email =  defaultUserAccountObj.user.email;
      state.description =  defaultUserAccountObj.user.description;
      state.account =  defaultUserAccountObj.address;
      state.balance =  defaultUserAccountObj.balance;
      state.contactNoCB =  '';
      state.emailCB =  '';
      state.loadingAccounts =  false;
      //newrankId must be cleared so a new one has to be regenerated for each account
      state.newrankId =  '';
      return state;
    }else{
      return this.noExistingUser(state, userAccounts);
    }
  },

  noExistingUser: function(state, userAccounts){
    state.userAccounts =  [];
    state.rankingDefault =  '';
    state.isUserInJson =  false;
    state.isCurrentUserActive = false;
    state.account = userAccounts[0];
    state.status = 'There is no existing user';
    return state;
  }
}

export default ChangeState;
