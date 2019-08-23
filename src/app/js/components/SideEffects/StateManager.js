//functional component changeState is written like this to expose just one
//function publicly (so that can be tested without exposing
//all the private functions) and handle the setting of state from here

export default function changeState(stateToChange, state, userAccounts, defaultUserAccount){
  //console.log('in changeState', defaultUserAccount)
  //REVIEW: be careful no existing user implies to use
  //noExistingUser in every case (as re-factor possibly affects logic: to be seen)
  if(defaultUserAccount[0] === undefined ||
    defaultUserAccount[0].user.username === ''
    || defaultUserAccount[0].user.username === undefined){
  //if(stateToChange === 'noExistingUser'){
  console.log('in noExistingUser')
    return noExistingUser(state, userAccounts);
  }
  else if(stateToChange === 'setUserSelectedRanking'){
    console.log('setUserSelectedRanking')
    return setUserSelectedRanking(state, defaultUserAccount);
  }
  else if(stateToChange === 'assignUserAcctStateToStateObj'){
    console.log('setUserSelectedRanking')
    return assignUserAcctStateToStateObj(userAccounts, defaultUserAccount, state);
  }
  else{
  state.userAccounts = defaultUserAccount;
  state.error = 'No state change has been sent';
  return state;
  }
}

function noExistingUser(state, userAccounts){
  console.log('no user', userAccounts)
  state.userAccounts =  userAccounts;
  state.rankingDefault =  '';
  state.isUserInJson =  false;
  state.isCurrentUserActive = false;
  state.account = userAccounts[0];
  return state;
}

function setUserSelectedRanking(state, defaultUserAccount){
  //console.log('in setUserSelectedRanking', defaultUserAccount)
    state.newrankId =  defaultUserAccount[0].user.rankingDefault;
    return state;
}

function assignUserAcctStateToStateObj(userAccounts, defaultUserAccount, state){
  //console.log('assignUserAcctStateToStateObj', state)
  state.userAccounts =  userAccounts;
  state.user =  defaultUserAccount[0].user;

  state.contactno =  defaultUserAccount[0].user.contactno;
  state.email =  defaultUserAccount[0].user.email;
  state.description =  defaultUserAccount[0].user.description;
  //account =  web3.eth.defaultAccount;
  state.account =  defaultUserAccount[0].address;
  state.balance =  defaultUserAccount[0].balance;
  state.contactNoCB =  '';
  state.emailCB =  '';
  state.loadingAccounts =  false;
  //newrankId must be cleared so a new one has to be regenerated for each account
  state.newrankId =  ''
  //;
  //state.viewingOnlyCB =  true
  return state;
}
