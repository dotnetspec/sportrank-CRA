import {
  wait,
} from '@testing-library/dom'
import 'jest-dom/extend-expect'
import JSONops from '../JSONops'
//import React from 'react'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'

afterEach(cleanup);

const rankingID = '5c6a81756874aa33ba152e56';
// const data = [
//   {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
//   {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
//   {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
//   {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
//   {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
//   {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
//   {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
// ]
const currentUser = 'player1';
const selectedOpponent = 'player3';
const accountNumber = '0x847700B781667abdD98E1393420754E503dca5b7';

//set 2 or more same rank no and try variations
const dataFalse = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":2,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":3,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];
const dataTrue = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];

describe('jsonio - pure', () => {
  it('JSONops isValidRankingOrder ', () => {

    let result = JSONops.isValidRankingOrder(dataFalse);
    expect(result).toBe(false);
    result = JSONops.isValidRankingOrder(dataTrue);
    expect(result).toBe(true);
  })
//REVIEW: many variations can go into these tests ...
  // it('JSONops processResult - won', () => {
  //   const spy_sendJSONDataWithRankingID = jest.spyOn(JSONops, '_sendJSONDataWithRankingID');
  //   spy_sendJSONDataWithRankingID.mockReturnValue(dataTrue);
  //   const resultEntered = 'won';
  //   const currentUser = 'player1';
  //   const result = JSONops.processResult(resultEntered, currentUser, dataTrue, rankingID);
  //   //'Won' but unchanged:
  //   expect(result).toEqual('Thank you. Your result has been entered. Your ranking has been changed');
  //   //expect(result).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');
  //   expect(spy_sendJSONDataWithRankingID).toHaveBeenCalled();
  //
  //   spy_sendJSONDataWithRankingID.mockRestore();
  // })

  it('JSONops processResult', () => {
    const spy_sendJSONDataWithRankingID = jest.spyOn(JSONops, '_sendJSONDataWithRankingID');
    spy_sendJSONDataWithRankingID.mockReturnValue(dataFalse);
    let resultEntered = 'undecided';
    let currentUser = 'player1';
    //bad data
    let result = JSONops.processResult(resultEntered, currentUser, dataFalse, rankingID);
    expect(result).toEqual('Ranking order PROBLEM. No changes have been made. Your ranking is unchanged');
    //good data
    //'undecided' but unchanged (data has to be reset to 'AVAILABLE'):
    result = JSONops.processResult(resultEntered, currentUser, dataTrue, rankingID);
    expect(result).toEqual('Thank you. No changes have been made. Your ranking is unchanged');
    expect(spy_sendJSONDataWithRankingID).toHaveBeenCalled();
    resultEntered = 'won';
    result = JSONops.processResult(resultEntered, currentUser, dataTrue, rankingID);
    //'Won' but unchanged:
    expect(result).toEqual('Thank you. Your result has been entered. Your ranking has been changed');
    //expect(result).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');
    expect(spy_sendJSONDataWithRankingID).toHaveBeenCalled();

    spy_sendJSONDataWithRankingID.mockRestore();
  })
});


it('JSONops deactivatePlayerInJson test ', async () => {
const fromJson = JSONops.deactivatePlayerInJson(rankingID, dataTrue, currentUser, accountNumber);
//console.log(fromJson);
//var lucky = numbers.filter(function(number) {
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.ACTIVE === false;
});
//console.log(playerObjToTest)
expect(playerObjToTest[0].NAME).toBe('player1');
})

it('JSONops reactivatePlayerInJson test ', async () => {
const player1Deactivated = JSONops.deactivatePlayerInJson(rankingID, dataTrue, currentUser, accountNumber);
const fromJson = JSONops.reactivatePlayerInJson(rankingID, player1Deactivated, currentUser, accountNumber);
//console.log(fromJson);
//var lucky = numbers.filter(function(number) {
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.NAME === 'player1';
});
//console.log(playerObjToTest)
expect(playerObjToTest[0].ACTIVE).toBe(true);
})


it('JSONops _updateDoChallengeJSONinJson test ', async () => {
//const player1Deactivated = JSONops._updateDoChallengeJSONinJson(rankingID, dataTrue, currentUser, accountNumber);
//(rankingID, currentUser, selectedOpponent, dataTrue)
const fromJson = JSONops._updateDoChallengeJSONinJson(rankingID, currentUser, selectedOpponent, dataTrue);
//console.log(fromJson);
//var lucky = numbers.filter(function(number) {
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.NAME === 'player1';
});
//console.log(playerObjToTest)
expect(playerObjToTest[0].CURRENTCHALLENGERNAME).toEqual('player3');
})

xit('JSONops reactivatePlayer test ', async () => {
const fromJson = JSONops.reactivatePlayer();
expect(fromJson).toBe(false);
})

xit('JSONops first test ', async () => {
const fromJson = JSONops.simple();
expect(fromJson).toBe(false);
})
