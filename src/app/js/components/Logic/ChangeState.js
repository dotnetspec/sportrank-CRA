//import  {_sendJSONDataWithRankingID}  from '../SideEffects/io/Jsonio'

//TODO: refactor
const ChangeState = {

  /**
    Usage:
    if useful list functions and how to what they do
  */
  //use this to create new functions ...
  simple: function(){
        return false;
  },

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
      defaultUserAccountObj
      &&
      defaultUserAccountObj.user
      &&
      defaultUserAccountObj.user.username){
        return true;
      }else{
        return false;
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
