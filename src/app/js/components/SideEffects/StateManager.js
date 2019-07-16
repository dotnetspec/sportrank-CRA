//functional component changeState is written like this to expose just one
//function publicly (so that can be tested without exposing
//all the private functions) and handle the setting of state from here

export default function changeState(stateToChange, state, userAccounts, defaultUserAccount){
  //REVIEW: be careful no existing user implies to use
  //noExistingUser in every case (as re-factor possibly affects logic: to be seen)
  if(defaultUserAccount[0] === undefined ||
    defaultUserAccount[0].user.username === ''
    || defaultUserAccount[0].user.username === undefined){
  //if(stateToChange === 'noExistingUser'){
    return noExistingUser(state);
  }
  else if(stateToChange === 'setUserSelectedRanking'){
    //console.log('setUserSelectedRanking')
    return setUserSelectedRanking(state, defaultUserAccount);
  }
  else{
  state.error = 'No state change has been sent';
  return state;
  }
}

function noExistingUser(state){
  state.rankingDefault =  '';
  state.isUserInJson =  false;
  state.isCurrentUserActive = false;
  return state;
}

function setUserSelectedRanking(state, defaultUserAccount){
  //console.log('in setUserSelectedRanking', defaultUserAccount)
    state.newrankId =  defaultUserAccount[0].user.rankingDefault;
    return state;
}
