//functional component changeState is written like this to expose just one
//function publicly (so that can be tested without exposing
//all the private functions) and handle the setting of state from here

export default function changeState(stateToChange, state, userAccounts, defaultUserAccount){
  //console.log('changeState')
  if(stateToChange === 'noExistingUser'){
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
