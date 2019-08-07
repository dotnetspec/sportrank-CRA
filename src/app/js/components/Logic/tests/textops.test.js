// import {
//   wait,
// } from '@testing-library/dom'
import 'jest-dom/extend-expect'
//import JSONops from '../JSONops'
import { userInfoText }  from '../TextOps'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'
//jest.mock("../../SideEffects/io/Jsonio");
//NB: a higher ranking has a lower ranking number
//app is thinking in terms of integers (not rankings like a squash player!)
//the integer has to be higher for the ranking to be lower

afterEach(cleanup);

//NB: not currently using the json data with these tests ...
describe('TextOps - pure', () => {

  it('TextOps userInfoText', () => {
    let currentChallengerName = 'player4';
    const currentChallengerContactNo = '123456';
    const currentChallengerEmail = 'test@test.com';
    const currentUserRank = 4;
    //challenger is NOT AVAILABLE (you currently have a challenger):
    //userInfoObj.textToDisplayContinue = 'Enter a result against ' + currentChallengerName + ' to continue';
    let result = userInfoText(currentChallengerName, currentChallengerContactNo, currentChallengerEmail, currentUserRank) ;
    expect(result.textToDisplayContinue).toEqual('Enter a result against ' + currentChallengerName + ' to continue');
    //good data
    //challenger IS AVAILABLE (you do not currently have a challenger)
    //userInfoObj.textToDisplayContinue += 'Please select an AVAILABLE opponent (below) to challenge: '
    currentChallengerName = 'AVAILABLE';
    result = userInfoText(currentChallengerName, currentChallengerContactNo, currentChallengerEmail, currentUserRank) ;
    expect(result.textToDisplayContinue).toEqual('Please select an AVAILABLE opponent (below) to challenge: ');
    // result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserHigherInRanking, rankingID);
    // expect(result.text).toEqual("Thank you. Your result has been entered. Your ranking has been changed");

    // result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserHigherInRanking, rankingID);
    // expect(result.text).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');

    //REVIEW: other tests can be added with this in future
    //const filteredResult = filterJson(result, 'player1');
    //expect(filteredResult[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');

    //expect(_sendJSONDataWithRankingID).toHaveBeenCalled();
  })
});

//REVIEW: helper functions - export?
// function filterJson(json, filterText){
//   return json.updatedUserJSON.filter(getDetailsByNameFromJson);
//   function getDetailsByNameFromJson(result) {
//     //console.log('result', result)
//     //avoid the first (anomolous object in the array)
//     if(result.STATUS !== 'NEW'){
//     //   return null;
//     // }else{
//       return result.NAME === filterText;
//     }
//   }
// }
