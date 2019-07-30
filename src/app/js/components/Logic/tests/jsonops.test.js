import {
  wait,
} from '@testing-library/dom'
import 'jest-dom/extend-expect'
import JSONops from '../JSONops'
//import React from 'react'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'

afterEach(cleanup);

const rankingID = '5c6a81756874aa33ba152e56';
const data = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
]
const currentUser = 'player1';
const selectedOpponent = 'player3';
const accountNumber = '0x847700B781667abdD98E1393420754E503dca5b7';


it('JSONops deactivatePlayerInJson test ', async () => {
const fromJson = JSONops.deactivatePlayerInJson(rankingID, data, currentUser, accountNumber);
//console.log(fromJson);
//var lucky = numbers.filter(function(number) {
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.ACTIVE === false;
});
//console.log(playerObjToTest)
expect(playerObjToTest[0].NAME).toBe('player1');
})

it('JSONops reactivatePlayerInJson test ', async () => {
const player1Deactivated = JSONops.deactivatePlayerInJson(rankingID, data, currentUser, accountNumber);
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
//const player1Deactivated = JSONops._updateDoChallengeJSONinJson(rankingID, data, currentUser, accountNumber);
//(rankingID, currentUser, selectedOpponent, data)
const fromJson = JSONops._updateDoChallengeJSONinJson(rankingID, currentUser, selectedOpponent, data);
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
