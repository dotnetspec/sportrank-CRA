import {
  _sendJSONDataWithRankingID
} from '../SideEffects/io/Jsonio'

//TODO: refactor
const JSONops = {

  /**
    Usage:
    Getting values:
    Obtaining one value by reference to another in the JSON:
    in Global Ranking json
    _getGlobalRankingVal

    in a given ranking list
    _getUserValue

    Setting Values:
    set a particular value for a given user in the json
    _setUserValue
    _setUserNameValue

    Updating Values:
    _updateEnterResultJSON
    reactivatePlayer

    Checking values:
    check for existing data (bool):
    isExistingRankingName
    isJSONEmpty

    Insertinig Values:
    createNewUserInNewJSON

    Sorting values:
    shiftAllOtherPlayersRankingUpByOne

    Deleting values:
    deletePlayer

    Sending JSON:
    _sendJSONDataWithRankingID
    _sendCreateNewRankingJSONData
  */
  //use this to create new functions ...
  simple: function() {
    return false;
  },

  isDefinedJson: function(data) {
    if (data === undefined) {
      return false;
    } else {
      return true;
    }
  },

  isValidRankingOrder: function(data) {
    //sort the array into ranking order first...
    data.sort(function(a, b) {
      return parseInt(a.RANK) - parseInt(b.RANK);
    })
    //check the array is valid ...
    for (var i = 1, len = data.length; i < len; i++) {
      //if current value smaller than or equal previous value
      //then the ranking order isn't valid...
      if (data[i].RANK <= data[i - 1].RANK) {
        return false;
      }
    }
    return true;
  },

  createUserPlayerJsonDataDisplay: function(rankingListJSONdata, newrankId, rankingJSONdata, user) {
    const currentChallengerName = JSONops._getUserValue(rankingJSONdata, user.username, "CURRENTCHALLENGERNAME");
    const createUserPlayerJsonDataDisplayObj = {
      textToDisplayRankName: JSONops._getGlobalRankingVal(rankingListJSONdata, newrankId, 'RANKINGNAME'),
      textToDisplayRankDesc: JSONops._getGlobalRankingVal(rankingListJSONdata, newrankId, 'RANKINGDESC'),
      currentUserRank: JSONops._getUserValue(rankingJSONdata, user.username, "RANK"),
      currentChallengerName: currentChallengerName,
      currentChallengerContactNo: JSONops._getUserValue(rankingJSONdata, currentChallengerName, "CONTACTNO"),
      currentChallengerEmail: JSONops._getUserValue(rankingJSONdata, currentChallengerName, "EMAIL"),
      currentUserName: JSONops._getUserValue(rankingJSONdata, user.username, "NAME"),
      activeBool: JSONops._getUserValue(rankingJSONdata, user.username, "ACTIVE")
    }
    return createUserPlayerJsonDataDisplayObj;
  },

  processResult: function(resultEntered, currentUser, data, newrankId) {
    //responseObj created to deal with testing/logic etc. issues of returning
    //both the text and the obj so that _sendJSONDataWithRankingID can be extracted
    //from this logic
    let responseObj = {
      text: '',
      updatedUserJSON: []
    };
    let checkedUserRank, checkedOpponentRank: 0;
    const opponentCurrentlyChallengingUser = JSONops._getUserValue(data, currentUser, "CURRENTCHALLENGERNAME");

    checkedUserRank = JSONops._getUserValue(data, currentUser, "RANK");
    checkedOpponentRank = JSONops._getUserValue(data, opponentCurrentlyChallengingUser, "RANK");

    const currentUserRankInt = parseInt(checkedUserRank);
    const selectedOpponentRankInt = parseInt(checkedOpponentRank);
    //TODO: use switch here?:
    if (resultEntered === 'undecided') {
      let updatedUserJSONnew = JSONops._updateEnterResultUnchangedJSON(newrankId, currentUser, opponentCurrentlyChallengingUser, data);
      if (JSONops.isValidRankingOrder(updatedUserJSONnew)) {
        //we still have to set to 'AVAILABLE'
        responseObj.text = "Thank you. No changes have been made. Your ranking is unchanged";
        responseObj.updatedUserJSON = updatedUserJSONnew;
        return responseObj;
      } else {
        responseObj.text = "Ranking order PROBLEM. No changes have been made. Your ranking is unchanged";
        return responseObj;
      }
    }
    //for 'won' if e.g. current user is ranked 2 (a lower integer) and oppenent is ranked 4
    // (a higher integer)
    //this will just set 'AVAILABLE' and NO ranking change will be made
    else if (resultEntered === 'won' && this.isUserAlreadyHigherRankedThanOpponent(currentUserRankInt, selectedOpponentRankInt)) {
      let updatedUserJSONnew = JSONops._updateEnterResultUnchangedJSON(newrankId, currentUser, opponentCurrentlyChallengingUser, data);
      if (JSONops.isValidRankingOrder(updatedUserJSONnew)) {
        updatedUserJSONnew = JSONops.updateDateStampsInJSON(newrankId, updatedUserJSONnew, currentUser, opponentCurrentlyChallengingUser);
        responseObj.text = "Thank you. Your result has been entered. Your ranking is unchanged";
        responseObj.updatedUserJSON = updatedUserJSONnew;
        return responseObj;
      } else {
        responseObj.text = "Ranking order PROBLEM. No changes have been made. Your ranking is unchanged";
        return responseObj;
      }
    } else if (resultEntered === 'lost' && this.isUserAlreadyLowerRankedThanOpponent(currentUserRankInt, selectedOpponentRankInt)) {
      let updatedUserJSONnew = JSONops._updateEnterResultUnchangedJSON(newrankId, currentUser, opponentCurrentlyChallengingUser, data);
      if (JSONops.isValidRankingOrder(updatedUserJSONnew)) {
        updatedUserJSONnew = JSONops.updateDateStampsInJSON(newrankId, updatedUserJSONnew, currentUser, opponentCurrentlyChallengingUser);
        responseObj.text = "Thank you. Your result has been entered. Your ranking is unchanged";
        responseObj.updatedUserJSON = updatedUserJSONnew;
        return responseObj;
      } else {
        responseObj.text = "Ranking order PROBLEM. No changes have been made. Your ranking is unchanged";
        return responseObj;
      }
      //only if make it here does ranking change as well as 'AVAILABLE'
    } else {
      let updatedUserJSONnew = JSONops._updateEnterResultJSON(newrankId, currentUser, checkedUserRank, opponentCurrentlyChallengingUser, checkedOpponentRank, data);
      if (JSONops.isValidRankingOrder(updatedUserJSONnew)) {
        updatedUserJSONnew = JSONops.updateDateStampsInJSON(newrankId, data, currentUser, opponentCurrentlyChallengingUser);
        responseObj.text = "Thank you. Your result has been entered. Your ranking has been changed";
        responseObj.updatedUserJSON = updatedUserJSONnew;
        return responseObj;
      } else {
        responseObj.text = "Ranking order PROBLEM. No changes have been made. Your ranking is unchanged";
        return responseObj;
      }
    }
  },

  //logic helper functions:
  getCorrectTextResponseOnResultEnter: function(currentUserRankInt, selectedOpponentRankInt) {

  },

  isUserAlreadyHigherRankedThanOpponent: function(currentUserRankInt, selectedOpponentRankInt) {
    if (currentUserRankInt < selectedOpponentRankInt) {
      return true;
    } else {
      return false;
    }
  },

  isUserAlreadyLowerRankedThanOpponent: function(currentUserRankInt, selectedOpponentRankInt) {
    if (currentUserRankInt > selectedOpponentRankInt) {
      return true;
    } else {
      return false;
    }
  },


  //export function processResult(resultEntered, currentUser) {
  //_processResult(resultEntered, currentUser){

  //Handle the opponent's row being clicked as well as user's row


  //TODO: should be renamed to getJSONValWithUserName
  //and this should be made more robust e.g. what if no jsonObj?
  _getUserValue: function(jsonObj, currentUser, valueToLookup) {

    let lookupCurrentUserValue = {
      jsonRS: jsonObj,
      lookupField: 'NAME',
      lookupKey: currentUser,
      targetField: valueToLookup,
      //targetData: "",
      checkAllRows: false
    };
    //console.log(lookupCurrentUserRank)
    if (jsonObj === undefined) {
      console.log('_getUserValue has no jsonObj')
    };
    const currentUserValue = this._getVal(lookupCurrentUserValue);

    return currentUserValue;
  },

  _setUserValue: function(jsonObj, userOrOppoName, valueToSet, newValue) {

    let setNewUserValue = {
      jsonRS: jsonObj,
      lookupField: 'NAME',
      lookupKey: userOrOppoName,
      targetField: valueToSet,
      targetData: newValue,
      checkAllRows: false
    };
    const newUserValue = this._setVal(setNewUserValue);

    return newUserValue;
  },

  _getGlobalRankingVal: function(jsonObj, rankingID, valueToLookup) {
    //console.log('inside lookupGlobalRankingValue', jsonObj)
    let lookupGlobalRankingValue = {
      jsonRS: jsonObj,
      lookupField: 'RANKINGID',
      lookupKey: rankingID,
      targetField: valueToLookup,
      //targetData: "",
      checkAllRows: false
    };
    //console.log('lookupGlobalRankingValue', lookupGlobalRankingValue)
    //const currentGlobalRankingVal = this._getVal(lookupGlobalRankingValue);

    return this._getVal(lookupGlobalRankingValue);
  },

  //Used to check if the ranking name already exists to prevent duplicates
  //might be queried many times as the user types a new ranking name
  isExistingRankingName: function(jsonObj, userTypedRankingNameStr) {
    //REVIEW: for an 'exists' function need to have a targeField entry
    // as something to compare against
    //perhaps change for a bool version of _getVal?
    console.log('userTypedRankingNameStr', userTypedRankingNameStr)
    let lookupRankName = {
      jsonRS: jsonObj,
      lookupField: 'RANKINGNAME',
      lookupKey: userTypedRankingNameStr,
      targetField: "RANKINGNAME",
      //targetData: "",
      checkAllRows: false
    };
    console.log('lookupRankName', lookupRankName)
    const currentUserValue = this._getVal(lookupRankName);
    console.log('currentUserValue should be undefined', currentUserValue)
    if (currentUserValue === "" || currentUserValue === undefined) {
      return false;
    } else {
      return true;
    }
    //return currentUserValue;
  },

  //for creating new users and corresponind new ranking need to use the acct number
  //which is know before user created to set the user name in the json to match
  //the account name
  //TODO:lookupField could be made another param for simple _setUserValue
  _setUserNameValue: function(jsonObj, userAccountNo, valueToSet, newValue, rankingID) {
    console.log('inside _setUserNameValue')
    let setNewUserValue = {
      jsonRS: jsonObj,
      lookupField: 'ACCOUNT',
      lookupKey: userAccountNo,
      targetField: valueToSet,
      targetData: newValue,
      checkAllRows: false
    };
    const newUserValue = this._setVal(setNewUserValue);
    _sendJSONDataWithRankingID(newUserValue, rankingID);

    return newUserValue;
  },

  // _updateEnterResultJSON: function(rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data){
  //     const result = this._updateEnterResultJSONinJson(rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data);
  //     //console.log('rankingID in _updateDoChallengeJSONinJson', rankingID);
  //     this._sendJSONDataWithRankingID(result, rankingID);
  //   },

  //re-set user and opponent fields now that a result needs to be processed
  //NB:playerNameOnRowClicked is for when opponent row clicked
  _updateEnterResultJSON: function(rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data) {

    const opponentCurrentlyChallengingUser = this._getUserValue(data, currentUser, "CURRENTCHALLENGERNAME");
    let newUserRank, newOpponentRank = 0;
    //swap the ranks (we should only be here if there is a change to record)
    newUserRank = selectedOpponentRank;
    newOpponentRank = currentUserRank;

    let updatedUserJSON = this._setUserValue(data, currentUser, "RANK", newUserRank);
    //NB:cover cases of user clicking on result for self or clicking on his opponent
    //to enter the result
    updatedUserJSON = this._setUserValue(data, playerNameOnRowClicked, "RANK", newOpponentRank);
    updatedUserJSON = this._setUserValue(data, opponentCurrentlyChallengingUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
    updatedUserJSON = this._setUserValue(data, opponentCurrentlyChallengingUser, "CURRENTCHALLENGERADDRESS", "");
    updatedUserJSON = this._setUserValue(data, opponentCurrentlyChallengingUser, "CURRENTCHALLENGERID", 0);
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERADDRESS", "");
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERID", 0);


    //send after all the updates have been made
    //to the updatedUserJSON object
    //this._sendJSONData(updatedUserJSON);
    //this._sendJSONDataWithRankingID(updatedUserJSON, rankingID);
    return updatedUserJSON;
  },

  // _updateEnterResultUnchangedJSON: function(rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data){
  //     const result = this._updateEnterResultUnchangedJSONinJson(rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data);
  //     //console.log('rankingID in _updateDoChallengeJSONinJson', rankingID);
  //     this._sendJSONDataWithRankingID(result, rankingID);
  //   },

  _updateEnterResultUnchangedJSON: function(rankingID, currentUser, selectedOpponent, data) {
    //set both player to AVAILABLE
    const opponentCurrentlyChallengingUser = this._getUserValue(data, currentUser, "CURRENTCHALLENGERNAME");
    //console.log(opponentCurrentlyChallengingUser)
    let updatedUserJSON = data;
    if (opponentCurrentlyChallengingUser !== 'AVAILABLE') {
      updatedUserJSON = this._setUserValue(data, opponentCurrentlyChallengingUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
      //console.log('updatedUserJSON1', updatedUserJSON);
      updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
      updatedUserJSON = this._setUserValue(data, selectedOpponent, "CURRENTCHALLENGERNAME", "AVAILABLE");
      //case where opponent's row isn't the one clicked on (user clicks own row to enter result)
      updatedUserJSON = this._setUserValue(data, opponentCurrentlyChallengingUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
      //console.log('updatedUserJSON', updatedUserJSON);
    }
    return updatedUserJSON;
  },

  //REVIEW:handle the same way as the enterresult functionality above (i.e. don't need 2 sep functs here )
  _updateDoChallengeJSON: function(rankingID, data, currentUser, accountno) {
    const result = this._updateDoChallengeJSONinJson(rankingID, data, currentUser, accountno);
    //console.log('rankingID in _updateDoChallengeJSONinJson', rankingID);
    _sendJSONDataWithRankingID(result, rankingID);
  },

  _updateDoChallengeJSONinJson: function(rankingID, currentUser, selectedOpponent, data) {
    //console.log('_updateDoChallengeJSON')
    //get the user's id number
    const userIDNumber = this._getUserValue(data, currentUser, "id");
    //console.log('userIDNumber', userIDNumber)
    const selectedopponentIDNumber = this._getUserValue(data, selectedOpponent, "id");

    const challengeraccount = this._getUserValue(data, currentUser, "ACCOUNT");
    //console.log('challengeraccount', challengeraccount);
    const challengeraddress = challengeraccount.owner;
    //console.log('challengeraddress', challengeraddress);

    const opponentaccount = this._getUserValue(data, selectedOpponent, "ACCOUNT");

    const opponentaddress = opponentaccount.owner;
    //console.log('opponentaddress', opponentaddress);
    //NB: selectedOpponentIDNumber not currently used but possible it may be needed
    //const selectedOpponentIDNumber = this._getUserValue(data, selectedOpponent, "id");

    let updatedUserJSON =
                      this._setUserValue(data, selectedOpponent, "CURRENTCHALLENGERID", userIDNumber);
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERID", selectedopponentIDNumber);
    //updatedUserJSON = this._setUserValue(data, selectedOpponent, "CURRENTCHALLENGERADDRESS", opponentaddress);
    //console.log('updatedUserJSON', updatedUserJSON)
    //set both names to be challenging eachother (no AVAILABLE) to ensure only 1 opponent at a time
    //to avoid validation problems with selecting opponents etc.
    updatedUserJSON = this._setUserValue(data, selectedOpponent, "CURRENTCHALLENGERNAME", currentUser);
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERNAME", selectedOpponent);
    updatedUserJSON = this._setUserValue(data, selectedOpponent, "CURRENTCHALLENGERADDRESS", challengeraddress);
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERADDRESS", opponentaddress);

    //this._sendJSONData(updatedUserJSON);
    //this._sendJSONDataWithRankingID(updatedUserJSON, rankingID);
    return updatedUserJSON;
  },

  _getVal: function(jsonObj) {
    for (var i = 0; i < jsonObj.jsonRS.length; i++) {
      //console.log('jsonObj.jsonRS[i][jsonObj.lookupField', jsonObj.jsonRS[i][jsonObj.lookupField)
      if (jsonObj.jsonRS[i][jsonObj.lookupField] === jsonObj.lookupKey || jsonObj.lookupKey === '*') {
        return jsonObj.jsonRS[i][jsonObj.targetField];
      }
    }
  },

  isJSONEmpty: function(originalData) {
    let createNewJSONuserObj = {
      jsonRS: originalData
    };
    if (createNewJSONuserObj.jsonRS.length < 2) {
      return true;
    } else {
      return false;
    }
  },

  //TODO: this is going to become createNewUserInExistingRankingJson
  //NB: rankingID is at the end of the param list
  createNewUserInJSON: function(originalData, username, contactno, email, accountno, description, rankingID) {

    let createNewJSONuserObj = {
      jsonRS: originalData
    };
    // let nextIDObj = {
    //   jsonRS: originalData
    //   };
    //
    // nextIDObj.lookupField = "NAME";
    // //TODO: this is 'currentuser' elasewhere
    // nextIDObj.lookupKey = username;
    //console.log('createNewJSONuserObj.jsonRS.length in createNewUserInJSON', createNewJSONuserObj.jsonRS.length)
    //REVIEW: Does this line correctly handle a blockchain reset in dev?
    let nextID = createNewJSONuserObj.jsonRS.length + 1;
    //console.log('createNewJSONuserObj.jsonRS.length', createNewJSONuserObj.jsonRS.length)
    //if it's a completely new json length will be 0
    if (createNewJSONuserObj.jsonRS.length < 1) {
      //console.log('json was new and had no existing data')
      //ensure nextID is correctly initialized to 1
      nextID = 1;
    }
    //use getCurrentNoOfActivePlayers to determine last rank pos
    let rankLastPosition = this.getCurrentNoOfActivePlayers(originalData);
    rankLastPosition += 1;
    const newData = {
      "DATESTAMP": Date.now(),
      "ACTIVE": true,
      "DESCRIPTION": description,
      "CURRENTCHALLENGERNAME": "AVAILABLE",
      "CURRENTCHALLENGERID": 0,
      "ACCOUNT": accountno,
      "RANK": rankLastPosition,
      "EMAIL": email,
      "CONTACTNO": contactno,
      "NAME": username,
      "id": nextID
    }
    createNewJSONuserObj.jsonRS.push(newData);
    //console.log('rankingID in createNewUserInJSON', rankingID)
    return createNewJSONuserObj;
    //_sendJSONDataWithRankingID(createNewJSONuserObj.jsonRS, rankingID);
  },

  createNewUserInNewJSON: function(username, contactno, email, accountno, description, rankingID) {
    console.log('inside createNewUserInNewJSON')
    // let createNewJSONuserObj = {
    //   jsonRS: {}
    //   };
    const newData = {
      "DATESTAMP": Date.now(),
      "ACTIVE": true,
      "DESCRIPTION": description,
      "CURRENTCHALLENGERNAME": "AVAILABLE",
      "CURRENTCHALLENGERID": 0,
      "ACCOUNT": accountno,
      "RANK": 1,
      "EMAIL": email,
      "CONTACTNO": contactno,
      "NAME": username,
      "id": 1
    }
    //createNewJSONuserObj.jsonRS.push(newData);
    //this._sendJSONData(createNewJSONuserObj.jsonRS);
    //this._sendJSONDataWithRankingID(createNewJSONuserObj.jsonRS, rankingID);
    return _sendJSONDataWithRankingID(newData, rankingID);
  },

  updateDateStampsInJSON: function(rankingID, data, username, opponent) {
    let updatedUserJSON = this._setUserValue(data, username, "DATESTAMP", Date.now());
    //console.log(updatedUserJSON)
    updatedUserJSON = this._setUserValue(data, opponent, "DATESTAMP", Date.now());
    //console.log(updatedUserJSON)
    //this._sendJSONData(updatedUserJSON);
    return updatedUserJSON;
  },

  updateUserInJSON: function(rankingID, data, username, contactno, email, description) {

    //REVIEW: get the user's id number or should stick to username?
    //const userIDNumber = this._getUserValue(data, currentUser, "id");
    //NB: selectedOpponentIDNumber not currently used but possible it may be needed
    //const selectedOpponentIDNumber = this._getUserValue(data, selectedOpponent, "id");

    let updatedUserJSON = this._setUserValue(data, username, "CONTACTNO", contactno);
    //set both names to be challenging eachother (no AVAILABLE) to ensure only 1 opponent at a time
    //to avoid validation problems with selecting opponents etc.
    updatedUserJSON = this._setUserValue(data, username, "EMAIL", email);

    updatedUserJSON = this._setUserValue(data, username, "DESCRIPTION", description);

    //this._sendJSONData(updatedUserJSON);
    _sendJSONDataWithRankingID(updatedUserJSON, rankingID);

  },

  reactivatePlayer: function(rankingID, data, currentUser, accountno) {
    const result = this.reactivatePlayerInJson(rankingID, data, currentUser, accountno);
    console.log('rankingID in deactivatePlayer', rankingID);
    _sendJSONDataWithRankingID(result, rankingID);
  },

  reactivatePlayerInJson: function(rankingID, data, currentUser, accountno) {
    //console.log('in reactivatePlayer', rankingID, data, currentUser, accountno)
    let updateUserRankToEndObj = {
      jsonRS: data
    };

    let updatedUserJSON = this._setUserValue(updateUserRankToEndObj.jsonRS, currentUser, "ACTIVE", true);

    const currentNumberOfActivePlayers = this.getCurrentNoOfActivePlayers(updateUserRankToEndObj.jsonRS)
    //Set rank to last of the ACTIVE players
    updatedUserJSON = this._setUserValue(updateUserRankToEndObj.jsonRS, currentUser, "RANK", currentNumberOfActivePlayers);

    //this._sendJSONData(updatedUserJSON);
    //this._sendJSONDataWithRankingID(updatedUserJSON, rankingID);
    return updatedUserJSON;

  },

  _setVal: function(update) {

    for (var i = 0; i < update.jsonRS.length; i++) {
      //REVIEW: what does update.lookupKey === '*' mean?
      if (update.jsonRS[i][update.lookupField] === update.lookupKey || update.lookupKey === '*') {
        update.jsonRS[i][update.targetField] = update.targetData;

        return update.jsonRS;
      }
    }
  },

  //de-couple function from sending
  deactivatePlayer: function(rankingID, data, currentUser, accountno) {
    const result = this.deactivatePlayerInJson(rankingID, data, currentUser, accountno);
    //console.log('result in deactivatePlayer', result);
    _sendJSONDataWithRankingID(result, rankingID);
  },

  deactivatePlayerInJson: function(rankingID, data, currentUser, accountno) {
    //console.log('rankingID, data, currentUser, accountno in deactivatePlayer', rankingID, data, currentUser, accountno)
    //console.log('data', data)
    let shiftUpRankingUpdateObj = {
      jsonRS: data,
      lookupField: "",
      lookupKey: 0,
      targetField: "",
      targetData: "",
      checkAllRows: false
    };

    //need this one to get the opponenets name when user is the challenger
    let lookupCurrentUsersOppenentPlayerValue = {
      jsonRS: data,
      lookupField: 'CURRENTCHALLENGERNAME',
      lookupKey: currentUser,
      targetField: 'NAME',
      //targetData: "",
      checkAllRows: false
    };
    //console.log(lookupCurrentUserRank)

    let updatedUserJSON = this._setUserValue(data, currentUser, "ACTIVE", false);

    //const currentUserRank = this._getUserRank(originalData, currentUser);
    const currentUserRank = this._getUserValue(data, currentUser, "RANK");

    //re-set targetfield and targetData set to 1
    //leave as is (w/o _setUserValue)
    shiftUpRankingUpdateObj.lookupField = "RANK";
    shiftUpRankingUpdateObj.targetField = "RANK";
    shiftUpRankingUpdateObj.targetData = 1;

    updatedUserJSON = this.shiftAllOtherPlayersRankingUpByOne(shiftUpRankingUpdateObj, currentUserRank);

    //NB:using original _setVal here not _getUserValue
    //cos of shiftAllOtherPlayersRankingUpByOne
    updatedUserJSON = this._setVal(shiftUpRankingUpdateObj);

    //set the user's rank to the bottom  as well
    //REVIEW: it's possible this (below) could be part of shiftAllOtherPlayersRankingUpByOne code
    //but currently is necessary here
    updatedUserJSON = this._setUserValue(data, currentUser, "RANK", shiftUpRankingUpdateObj.jsonRS.length);
    //re-set my current opponent to AVAILABLE
    updatedUserJSON = this._setUserValue(data, currentUser, "CURRENTCHALLENGERNAME", "AVAILABLE");
    //get current opponent (who player is challenging) name
    //where current user is the challenger then we get the player name
    //const opponentsName = this._getUserValue(data, currentUser, "CURRENTCHALLENGERNAME");
    //console.log('currentUsersOppenentPlayerValue', currentUsersOppenentPlayerValue)
    //re-set my opponents 'current opponent' to AVAILABLE if not already AVAILABLE
    // if(opponentsName !== "AVAILABLE"){
    //   updatedUserJSON = this._setUserValue(data, opponentsName, "CURRENTCHALLENGERNAME", "AVAILABLE");
    // }
    //handle the opponent's display (if there is an opponenet)
    let currentUsersOppenentPlayerValue = this._getVal(lookupCurrentUsersOppenentPlayerValue);
    if (currentUsersOppenentPlayerValue !== undefined) {
      //re-set my opponents 'current opponent' to AVAILABLE
      updatedUserJSON = this._setUserValue(data, currentUsersOppenentPlayerValue, "CURRENTCHALLENGERNAME", "AVAILABLE");
    }
    //re-set my opponents 'current opponent' to AVAILABLE
    //updatedUserJSON = this._setUserValue(data, currentUsersOppenentPlayerValue, "CURRENTCHALLENGERNAME", "AVAILABLE");

    //console.log('deactivatePlayer updatedUserJSON', updatedUserJSON)
    //this._sendJSONData(updatedUserJSON);
    //this._sendJSONDataWithRankingID(updatedUserJSON, rankingID);
    return updatedUserJSON;
  },

  // getCurrentUsersOppenentPlayerValue: function((data, currentUser){
  //   let lookupCurrentUsersOppenentPlayerValue = {
  //     jsonRS: data,
  //     lookupField: 'CURRENTCHALLENGERNAME',
  //     lookupKey: currentUser,
  //     targetField: 'NAME',
  //     //targetData: "",
  //     checkAllRows: false
  //     };
  //     //console.log(lookupCurrentUserRank)
  //     this._getUserValue(data, currentUser, "CURRENTCHALLENGERNAMEANK");
  //     const currentUsersOppenentPlayerValue = this._getVal(lookupCurrentUsersOppenentPlayerValue);
  //     return currentUsersOppenentPlayerValue;
  // },

  shiftAllOtherPlayersRankingUpByOne: function(update, currentUserRank) {
    let ranktobeupdated = 1;

    for (var i = 0; i < update.jsonRS.length; i++) {

      ranktobeupdated = update.jsonRS[i][update.lookupField];
      //make the change according to the current users relative position
      // if(currentUserRank === update.jsonRS[i][update.lookupField]){
      //   //this is the current user's rank which must now be set to the last rank
      //   update.jsonRS[i][update.targetField] = update.jsonRS.length;
      // }
      // else

      if (currentUserRank < update.jsonRS[i][update.lookupField]) {
        ranktobeupdated -= 1;
        update.jsonRS[i][update.targetField] = ranktobeupdated;
      }
    }
    return update.jsonRS;
  },

  getCurrentNoOfActivePlayers: function(data) {
    let currentNoOfActivePlayers = 0;

    let activePlayerJSONuserObj = {
      jsonRS: data,
    };

    activePlayerJSONuserObj.lookupField = "ACTIVE";

    for (var i = 0; i < activePlayerJSONuserObj.jsonRS.length; i++) {
      if (activePlayerJSONuserObj.jsonRS[i][activePlayerJSONuserObj.lookupField] === true) {
        currentNoOfActivePlayers += 1;
      }
    }
    return currentNoOfActivePlayers;
  },

  //NB:admin function - not used directly by app
  //TODO: create a separate admin screen
  //NB: accountno does not appear to be used ...
  deletePlayer: function(originalData, currentUser, accountno) {
    let deletePlayerJSONuserObj = {
      jsonRS: originalData,
    };
    deletePlayerJSONuserObj.lookupField = "NAME";
    deletePlayerJSONuserObj.lookupKey = currentUser;

    for (var i = 0; i < deletePlayerJSONuserObj.jsonRS.length; i++) {
      if (deletePlayerJSONuserObj.jsonRS[i][deletePlayerJSONuserObj.lookupField] === deletePlayerJSONuserObj.lookupKey || deletePlayerJSONuserObj.lookupKey === '*') {
        //  console.log(deletePlayerJSONuserObj.jsonRS[i]);
        delete deletePlayerJSONuserObj.jsonRS[i];
      }
    }
    deletePlayerJSONuserObj.jsonRS = deletePlayerJSONuserObj.jsonRS.filter(function(x) {
      return x !== null
    });
    return deletePlayerJSONuserObj.jsonRS;
  },

  //Route not found is extraneous info that generates warning in table display
  deleteRouteNotFoundInGlobalJson: function(originalData) {
    let deleteRouteNotFoundInGlobalJsonObj = {
      jsonRS: originalData,
    };
    deleteRouteNotFoundInGlobalJsonObj.lookupField = "message";
    deleteRouteNotFoundInGlobalJsonObj.lookupKey = "Route not found!";

    for (var i = 0; i < deleteRouteNotFoundInGlobalJsonObj.jsonRS.length; i++) {
      if (deleteRouteNotFoundInGlobalJsonObj.jsonRS[i][deleteRouteNotFoundInGlobalJsonObj.lookupField] === deleteRouteNotFoundInGlobalJsonObj.lookupKey || deleteRouteNotFoundInGlobalJsonObj.lookupKey === '*') {
        //  console.log(deleteRouteNotFoundInGlobalJsonObj.jsonRS[i]);
        delete deleteRouteNotFoundInGlobalJsonObj.jsonRS[i];
      }
    }
    //REVIEW: what does this filter do?
    deleteRouteNotFoundInGlobalJsonObj.jsonRS = deleteRouteNotFoundInGlobalJsonObj.jsonRS.filter(function(x) {
      return x !== null
    });
    return deleteRouteNotFoundInGlobalJsonObj.jsonRS;
  },


  //apart from IN/ACTIVE is player listed at all?
  isPlayerListedInJSON: function(data, currentUser) {
    //console.log('data in isPlayerListedInJSON',data)
    //console.log('currentUser in isPlayerListedInJSON', currentUser)
    if (data === undefined) {
      return false
    }
    //using ACCOUNT not NAME to test if user is listed in the json
    const result = this._getUserValue(data, currentUser, "ACCOUNT")
    //console.log('result', result)
    if (result === undefined) {
      return false
    } else
      //5 is arbitrary. if < 5 no account number was returned
      if (result.length < 5) {
        return false
      } else {
        return true
      };
  },

  //just returning undefined not good enough
  isSafeToAddPlayerToJSON: function(data, currentUser) {
    //using ACCOUNT not NAME to test if user is listed in the json
    //need to check multiple fields to ensure user not already listed
    const accountNo = this._getUserValue(data, currentUser, "ACCOUNT")
    const currentChallengerName = this._getUserValue(data, currentUser, "CURRENTCHALLENGERNAME")
    const currentid = this._getUserValue(data, currentUser, "id")
    ////5 is arbitrary. if < 5 no account number was returned
    //then it should the case that the user
    //is not in the JSON and is safe to add
    if (accountNo === undefined ||
      currentChallengerName === undefined ||
      currentid === undefined ||
      accountNo.length < 5) {
      return true
    } else
      //otherwise not safe
      return false;
  },

  //TODO: will have to separate isPlayerAvailableToChallengeObj.jsonRS[i].CURRENTCHALLENGERNAME === user
  //out to new function at some point cos otherwise pos of double challenge v same Player
  //update: think this has been done in isPlayerAlreadyChallengingThisOpp
  isPlayerAvailableToChallenge: function(data, opponentName, user) {
    let isPlayerAvailableToChallengeObj = {
      jsonRS: data
    };
    //used for return value below
    let isPlayerAvailable = false;
    isPlayerAvailableToChallengeObj.lookupField = "NAME";
    isPlayerAvailableToChallengeObj.lookupKey = opponentName;
    for (var i = 0; i < isPlayerAvailableToChallengeObj.jsonRS.length; i++) {
      if (isPlayerAvailableToChallengeObj.jsonRS[i][isPlayerAvailableToChallengeObj.lookupField] === isPlayerAvailableToChallengeObj.lookupKey || isPlayerAvailableToChallengeObj.lookupKey === '*') {
        if (isPlayerAvailableToChallengeObj.jsonRS[i].CURRENTCHALLENGERNAME === 'AVAILABLE' &&
          !this.doesPlayerAlreadHaveAChallenge(data, opponentName, user)) {
          isPlayerAvailable = true;
        }
      }
    }
    if (isPlayerAvailable === true) {
      return true;
    } else {
      return false;
    }
  },

  doesPlayerAlreadHaveAChallenge: function(data, opponentName, user) {
    let doesPlayerAlreadHaveAChallengeObj = {
      jsonRS: data
    };
    //used for return value below
    let doesPlayerAlreadHaveAChallenge = false;
    doesPlayerAlreadHaveAChallengeObj.lookupField = "CURRENTCHALLENGERNAME";
    //NB: using the opponentName to look this up against the user (as challenger) name
    doesPlayerAlreadHaveAChallengeObj.lookupKey = user;
    for (var i = 0; i < doesPlayerAlreadHaveAChallengeObj.jsonRS.length; i++) {
      if (doesPlayerAlreadHaveAChallengeObj.jsonRS[i].CURRENTCHALLENGERNAME === opponentName ||
        doesPlayerAlreadHaveAChallengeObj.jsonRS[i].CURRENTCHALLENGERNAME === user) {
        //console.log(doesPlayerAlreadHaveAChallengeObj.jsonRS[i].CURRENTCHALLENGERNAME)
        doesPlayerAlreadHaveAChallenge = true;
      }
    }
    if (doesPlayerAlreadHaveAChallenge === true) {
      return true;
    } else {
      return false;
    }
  },

  isPlayerAvailableToEnterResultAgainst: function(data, opponentName, user) {
    let isPlayerAvailableToEnterResultAgainstObj = {
      jsonRS: data
    };
    //used for return value below
    let isPlayerAvailableToEnterResultAgainst = true;
    isPlayerAvailableToEnterResultAgainstObj.lookupField = "NAME";
    //opponentName comes from the row that is clicked (don't confuse with user)
    isPlayerAvailableToEnterResultAgainstObj.lookupKey = opponentName;
    //isPlayerAvailableToEnterResultAgainstObj.lookupKey = user;
    console.log(user)
    console.log(opponentName)

    for (var i = 0; i < isPlayerAvailableToEnterResultAgainstObj.jsonRS.length; i++) {
      if (isPlayerAvailableToEnterResultAgainstObj.jsonRS[i][isPlayerAvailableToEnterResultAgainstObj.lookupField] ===
        isPlayerAvailableToEnterResultAgainstObj.lookupKey || isPlayerAvailableToEnterResultAgainstObj.lookupKey ===
        '*') {
        //NB. be careful editing this logic - save first!
        if ((isPlayerAvailableToEnterResultAgainstObj.jsonRS[i].NAME !== user &&
            isPlayerAvailableToEnterResultAgainstObj.jsonRS[i].CURRENTCHALLENGERNAME !== user) ||
          (isPlayerAvailableToEnterResultAgainstObj.jsonRS[i].NAME !== opponentName &&
            isPlayerAvailableToEnterResultAgainstObj.jsonRS[i].CURRENTCHALLENGERNAME !== opponentName) ||
          isPlayerAvailableToEnterResultAgainstObj.jsonRS[i].CURRENTCHALLENGERNAME === 'AVAILABLE'
        ) {
          console.log(1)
          isPlayerAvailableToEnterResultAgainst = false;
        } else {
          //will default to true (modal will display)
          console.log(2)
        }
      }
    }

    if (isPlayerAvailableToEnterResultAgainst === true) {
      return true;
    } else {
      return false;
    }
  },

  isRankingIDInvalid: function(data) {
    console.log('data in isRankingIDInvalid')
    //var temp = JSON.parse(data);
    console.log(data)
    console.log(data.RANKINGID)
    if (data[0] === null || data.RANKINGID === '') {
      return true;
    } else {
      return false;
    }
  },

  isPlayerAlreadyChallengingThisOpp: function(data, opponentName, user) {
    let isPlayerAlreadyChallengingThisOppObj = {
      jsonRS: data
    };
    //used for return value below
    let isPlayerAlreadyChallengingThisOpp = false;
    isPlayerAlreadyChallengingThisOppObj.lookupField = "NAME";
    isPlayerAlreadyChallengingThisOppObj.lookupKey = opponentName;

    for (var i = 0; i < isPlayerAlreadyChallengingThisOppObj.jsonRS.length; i++) {
      if (isPlayerAlreadyChallengingThisOppObj.jsonRS[i][isPlayerAlreadyChallengingThisOppObj.lookupField] === isPlayerAlreadyChallengingThisOppObj.lookupKey || isPlayerAlreadyChallengingThisOppObj.lookupKey === '*') {
        if (isPlayerAlreadyChallengingThisOppObj.jsonRS[i].CURRENTCHALLENGERNAME === user) {
          isPlayerAlreadyChallengingThisOpp = true;
        }
      }
    }

    if (isPlayerAlreadyChallengingThisOpp === true) {
      return true;
    } else {
      return false;
    }
  },

  isPlayerLowerRankThanChallengeOpponent: function(data, opponentName, currentUser) {
    const playerRank = this._getUserValue(data, currentUser, "RANK");
    const opponentRank = this._getUserValue(data, opponentName, "RANK");

    //let isChallengerLowerRankThanPlayer = false;
    //NB: A lower number is a HIGHER rank, a HIGHER number is a LOWER rank
    if (playerRank > opponentRank) {
      return true;
    } else {
      return false;
    }
  },

  getIdNoFromJsonbinResponse: function(data) {
    console.log('data', data)
    let dataObj = {
      jsonRS: data
    };
    console.log('dataObj.jsonRS', dataObj.jsonRS)
    let jsonresult = JSON.parse(dataObj.jsonRS);
    console.log('jsonresult', jsonresult)
    // console.log(jsonresult)
    // console.log('jsonresult.RANKINGID')
    console.log(jsonresult.id)
    return jsonresult.id;
  },

  // //TODO: all functions using _sendJSONData will need to be updated to use this
  // //one that includes the rankingID
  //   _sendJSONDataWithRankingID: function(data, rankingID){
  //     console.log('rankingID inside _sendJSONDataWithRankingID',rankingID)
  //     console.log('data inside _sendJSONDataWithRankingID',data)
  //     //console.log('inside _sendJSONDataWithRankingID')
  //     let httpString = "https://api.jsonbin.io/b/";
  //     //httpString += rankingID + '"';
  //     httpString += rankingID;
  //     let req = new XMLHttpRequest();
  //
  //         req.onreadystatechange = () => {
  //           if (req.readyState === XMLHttpRequest.DONE) {
  //             console.log('httpString in req.onreadystatechange', httpString);
  //             //NB. when checking on jsonbin.io e.g. https://jsonbin.io/5c340b667b31f426f8531274/1
  //             //ensure you include the version number to see that the array has been 'PUT'
  //             console.log('req.responseText in _sendJSONDataWithRankingID', req.responseText);
  //             //console.log(req.responseText);
  //             return req.responseText;
  //           }
  //         };
  //         //NOTE: it is the api.jsonbin NOT the jsonbin.io!
  //         //JSON data can and should be in ANY order
  //         //bin id is: https://jsonbin.io/5bd82af2baccb064c0bdc92a/
  //         //use above to edit manually.
  //         //to view latest https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/latest
  //
  //         req.open("PUT", httpString, true);
  //         req.setRequestHeader("Content-type", "application/json");
  //         let myJsonString = JSON.stringify(data);
  //         console.log('httpString, data in _sendJSONDataWithRankingID', httpString, data);
  //
  //         //console.log('data.id alone in _sendJSONDataWithRankingID', data.id)
  //         //I think data.id will only be defined IF this is a new ranking
  //         //if this is a new ranking send an array, not just an object
  //         //if this is a new ranking id will be 1
  //         //HACK: there may be a better way to test that this is a new ranking and user
  //         //the first entry to jsonbin must have array brackets so that responseJson can be
  //         //correctly displayed in BootstrapTable
  //         if(data.id === 1){
  //         const myJsonStringAsArray = "[" + myJsonString + "]";
  //           req.send(myJsonStringAsArray);
  //         }else{
  //           req.send(myJsonString);
  //         }
  //         //return null;
  // },

  //NB: currently this is sent to the hardcoded global ranking list at 5c36f5422c87fa27306acb52
  _sendCreateNewRankingJSONData: function(origGlobalRankingData, rankingID, rankName, rankDescription) {
    console.log('inside _sendCreateNewRankingJSONData', rankingID, rankName, rankDescription)
    let createNewJSONrankingObj = {
      jsonRS: origGlobalRankingData
    };
    //REVIEW: this will need to be handled differently eventually
    const globalRankingsDefaultId = '5c36f5422c87fa27306acb52';
    const newData = {
      "RANKINGID": rankingID,
      "ACTIVE": true,
      "RANKINGDESC": rankDescription,
      "RANKINGNAME": rankName
    }
    createNewJSONrankingObj.jsonRS.push(newData);
    return _sendJSONDataWithRankingID(createNewJSONrankingObj.jsonRS, globalRankingsDefaultId);
  }
}

export default JSONops;
