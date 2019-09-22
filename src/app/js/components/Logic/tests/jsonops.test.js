import {
  wait,
} from '@testing-library/dom'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import JSONops from '../JSONops'
import {Jsonio, _sendJSONDataWithRankingID}  from '../../SideEffects/io/Jsonio'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'
import {
  copyconsoletemp
} from '../../../../../../test-fixtures/jsonbin/copyconsoletemp'


jest.mock("../../SideEffects/io/Jsonio");
//NB: a higher ranking has a lower ranking number
//app is thinking in terms of integers (not rankings like a squash player!)
//the integer has to be higher for the ranking to be lower

afterEach(cleanup);

const rankingID = '5c6a81756874aa33ba152e56';
const currentUser = 'player1';
const selectedOpponent = 'player3';
const accountNumber = '0x847700B781667abdD98E1393420754E503dca5b7';
//REVIEW: many variations can go into these tests ...
//set 2 or more same rank no and try variations
const dataFalse = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":2,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":3,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];
const dataTrue = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player2","CURRENTCHALLENGERID":2,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"player1","CURRENTCHALLENGERID":3,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];

describe('JSONops - pure', () => {
  it('JSONops simple check ', async () => {
    const fromJSONops = JSONops.simple();
    expect(fromJSONops).toBe(false);
  })

  it('JSONops isValidRankingOrder ', () => {
    let result = JSONops.isValidRankingOrder(dataFalse);
    expect(result).toBe(false);
    result = JSONops.isValidRankingOrder(dataTrue);
    expect(result).toBe(true);
  })

  it('JSONops processResult - undecided', () => {
    let currentUser = 'player1';
    //'undecided' but unchanged (data has to be reset to 'AVAILABLE'):
    //bad data
    let resultEntered = 'undecided';
    let result = JSONops.processResult(resultEntered, currentUser, dataFalse, rankingID);
    expect(result.text).toEqual('Ranking order PROBLEM. No changes have been made. Your ranking is unchanged');
    //good data
    result = JSONops.processResult(resultEntered, currentUser, dataTrue, rankingID);
    expect(result.text).toEqual('Thank you. No changes have been made. Your ranking is unchanged');
    //console.log(result.updatedUserJSON);
    //filter object array to get player1 challenger name
    // function getDetailsByNameFromJson(result) {
    //   console.log('result', result)
    //   //avoid the first (anomolous object in the array)
    //   if(result.STATUS !== 'NEW'){
    //   //   return null;
    //   // }else{
    //     return result.NAME === 'player1';
    //   }
    // }
    const filteredResult = filterJson(result, 'player1');
    //getDetailsByNameFromJson is a helper function (at the bottom)
    //const newArray = result.updatedUserJSON.filter(getDetailsByNameFromJson);

    expect(filteredResult[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');
    //expect(_sendJSONDataWithRankingID).toHaveBeenCalled();

    //'Won':
    // resultEntered = 'won';
    // //bad data - no change
    // result = JSONops.processResult(resultEntered, currentUser, dataFalse, rankingID);
    // expect(result).toEqual('Ranking order PROBLEM. No changes have been made. Your ranking is unchanged');
    // //good data
    // result = JSONops.processResult(resultEntered, currentUser, dataTrue, rankingID);
    // expect(result).toEqual('Thank you. Your result has been entered. Your ranking has been changed');
    // //expect(result).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');
    // expect(spy_sendJSONDataWithRankingID).toHaveBeenCalled();

    //spy_sendJSONDataWithRankingID.mockRestore();
  })

  it('JSONops processResult - won', () => {
    const dataTrueWithUserLowerInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];
    const dataTrueWithUserHigherInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":3,"CURRENTCHALLENGERNAME":"player1","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];
    const dataFalseWithUserLowerInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];

    let currentUser = 'player1';
    //bad data
    //'Won':
    let resultEntered = 'won';
    //bad data
    let result = JSONops.processResult(resultEntered, currentUser, dataFalseWithUserLowerInRanking, rankingID);
    expect(result.text).toEqual('Ranking order PROBLEM. No changes have been made. Your ranking is unchanged');
    //good data
    result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserHigherInRanking, rankingID);
    expect(result.text).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');
    result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserLowerInRanking, rankingID);
    expect(result.text).toEqual('Thank you. Your result has been entered. Your ranking has been changed');
    //expect(_sendJSONDataWithRankingID).toHaveBeenCalled();


    //REVIEW: other tests can be added with this in future
    const filteredResult = filterJson(result, 'player1');
    expect(filteredResult[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');
  })

  it('JSONops processResult - lost', () => {
    const dataTrueWithUserLowerInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":4,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":2,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":3,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":3,"CURRENTCHALLENGERNAME":"player1","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];
    const dataTrueWithUserHigherInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":3,"CURRENTCHALLENGERNAME":"player1","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];
    const dataFalseWithUserLowerInRanking = [
      {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
      {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":4,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
      {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":2,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
      {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":3,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
      {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":3,"CURRENTCHALLENGERNAME":"player1","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
      {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
    ];
    let currentUser = 'player1';
    //bad data
    //'Won':
    let resultEntered = 'lost';
    //bad data - no change
    let result = JSONops.processResult(resultEntered, currentUser, dataFalseWithUserLowerInRanking, rankingID);
    expect(result.text).toEqual('Ranking order PROBLEM. No changes have been made. Your ranking is unchanged');
    //good data
    result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserLowerInRanking, rankingID);
    expect(result.text).toEqual("Thank you. Your result has been entered. Your ranking is unchanged");
    result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserHigherInRanking, rankingID);
    expect(result.text).toEqual("Thank you. Your result has been entered. Your ranking has been changed");

    // result = JSONops.processResult(resultEntered, currentUser, dataTrueWithUserHigherInRanking, rankingID);
    // expect(result.text).toEqual('Thank you. Your result has been entered. Your ranking is unchanged');

    //REVIEW: other tests can be added with this in future
    const filteredResult = filterJson(result, 'player1');
    expect(filteredResult[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');

    //expect(_sendJSONDataWithRankingID).toHaveBeenCalled();
  })
});

fit('JSONops createNewUserInJSON', () => {
  const dataTrue = [
    {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
    {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];
  // const dataFalseWithUserLowerInRanking = [
  //   {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  //   {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  //   {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  //   {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  //   {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  //   {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  //   {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  // ];
  //new user is player7
  const currentUser = 'testuser1';
  const contactno = '1234567890'
  const email = 'mytest7@mytest7.com'
  //non-existent made up account no!
  const accountno = '0x23fCa109110F043847bb0Ca87805f3642D8B7Dd8'
  const description = 'test Mr.testuser1 add';
  //copyconsoletemp good data
  let result = JSONops.createNewUserInJSON(copyconsoletemp, currentUser, contactno, email, accountno, description, rankingID);
  expect(result.jsonRS[6].NAME).toEqual('testuser1');
  expect(result.jsonRS[6].ADDRESS).toEqual('0x23fCa109110F043847bb0Ca87805f3642D8B7Dd8');
  expect(result.jsonRS[6].CURRENTCHALLENGERADDRESS).toEqual('');
})

it('JSONops isPlayerListedInJSON', () => {
  //must have ADDRESS field for this to work ..
  const dataWithUserInJson = [
    {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
    {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];
  const dataWithUserNOTInJson = [
    {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
    //{"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];

  const dataWithUserInJsonTwice =
  [{"id":3,"NAME":"mplayer1","CONTACTNO":"12345668","EMAIL":"mtest1@test.com","RANK":1,"ADDRESS":"0xF10474f12c7E25420304454cC3Cd33A868CAf2E0","CURRENTCHALLENGERID":4,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"mtester","ACTIVE":true,"DATESTAMP":1552367186957},
  {"DATESTAMP":1552368743582,"ACTIVE":true,"DESCRIPTION":"p1","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0xd04b71a8eddcC67ceEf47FF5ED9ecFe3383D2C28","RANK":2,"EMAIL":"p1@test.com","CONTACTNO":"12345678","NAME":"player1","id":1},
  {"id":2,"NAME":"player3","CONTACTNO":"12345678","EMAIL":"test3@test.com","RANK":3,"ADDRESS":"0xcE2aF83b46015d4731Ab3deef8bee01261DF7272","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"p3","ACTIVE":true,"DATESTAMP":1564986217639},
  {"id":4,"NAME":"player2","RANK":4,"ADDRESS":"0x4A0a14bA869bEe85c490A5E6401D3f740039a01F","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","ACTIVE":true,"DATESTAMP":1565160670443},
  {"id":4,"NAME":"player2","RANK":4,"ADDRESS":"0x4A0a14bA869bEe85c490A5E6401D3f740039a01F","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","ACTIVE":true,"DATESTAMP":1565160670443}];

  let currentUser = 'player1';
  let result = [];
  result = JSONops.isPlayerListedInJSON(dataWithUserInJson, currentUser);
  expect(result).toBe(true);
  result = JSONops.isPlayerListedInJSON(dataWithUserNOTInJson, currentUser);
  expect(result).toBe(false);
  currentUser = 'player2';
  result = JSONops.isPlayerListedInJSON(dataWithUserInJsonTwice, currentUser);
  expect(result).toBe(true);
})


it('JSONops isSafeToAddPlayerToJSON', () => {
  //must have ADDRESS field for this to work ..
  const dataWithUserInJson = [
    {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
    {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];
  const dataWithUserNOTInJson = [
    {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
    //{"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player4","CURRENTCHALLENGERID":4,"ADDRESS":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":1,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ADDRESS":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":2,"ADDRESS":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":6,"ADDRESS":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];

  const dataWithUserInJsonTwice =
  [{"id":3,"NAME":"mplayer1","CONTACTNO":"12345668","EMAIL":"mtest1@test.com","RANK":1,"ADDRESS":"0xF10474f12c7E25420304454cC3Cd33A868CAf2E0","CURRENTCHALLENGERID":4,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"mtester","ACTIVE":true,"DATESTAMP":1552367186957},
  {"DATESTAMP":1552368743582,"ACTIVE":true,"DESCRIPTION":"p1","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ADDRESS":"0xd04b71a8eddcC67ceEf47FF5ED9ecFe3383D2C28","RANK":2,"EMAIL":"p1@test.com","CONTACTNO":"12345678","NAME":"player1","id":1},
  {"id":2,"NAME":"player3","CONTACTNO":"12345678","EMAIL":"test3@test.com","RANK":3,"ADDRESS":"0xcE2aF83b46015d4731Ab3deef8bee01261DF7272","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"p3","ACTIVE":true,"DATESTAMP":1564986217639},
  {"id":4,"NAME":"player2","RANK":4,"ADDRESS":"0x4A0a14bA869bEe85c490A5E6401D3f740039a01F","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","ACTIVE":true,"DATESTAMP":1565160670443},
  {"id":4,"NAME":"player2","RANK":4,"ADDRESS":"0x4A0a14bA869bEe85c490A5E6401D3f740039a01F","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","ACTIVE":true,"DATESTAMP":1565160670443}];

  let currentUser = 'player1';
  let result = [];
  result = JSONops.isSafeToAddPlayerToJSON(dataWithUserInJson, currentUser);
  expect(result).toBe(false);
  result = JSONops.isSafeToAddPlayerToJSON(dataWithUserNOTInJson, currentUser);
  expect(result).toBe(true);
  currentUser = 'player2';
  result = JSONops.isSafeToAddPlayerToJSON(dataWithUserInJsonTwice, currentUser);
  expect(result).toBe(false);
})


it('JSONops deactivatePlayerInJson test ', async () => {
const fromJson = JSONops.deactivatePlayerInJson(rankingID, dataTrue, currentUser, accountNumber);
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.ACTIVE === false;
});
expect(playerObjToTest[0].NAME).toBe('player1');
})

it('JSONops reactivatePlayerInJson test ', async () => {
const player1Deactivated = JSONops.deactivatePlayerInJson(rankingID, dataTrue, currentUser, accountNumber);
const fromJson = JSONops.reactivatePlayerInJson(rankingID, player1Deactivated, currentUser, accountNumber);
  var playerObjToTest = fromJson.filter(function(playerObj) {
  return playerObj.NAME === 'player1';
});
expect(playerObjToTest[0].ACTIVE).toBe(true);
})


it('JSONops _updateDoChallengeJSONinJson test ', async () => {
  const fromJson = JSONops._updateDoChallengeJSONinJson(rankingID, currentUser, selectedOpponent, dataTrue);
    var playerObjToTest = fromJson.filter(function(playerObj) {
    return playerObj.NAME === 'player1';
  });
  expect(playerObjToTest[0].CURRENTCHALLENGERNAME).toEqual('player3');
})

//NB: Using the new data set here
it('JSONops _updateDoChallengeJSONinJson test with CURRENTCHALLENGERADDRESS', async () => {
  //these names could be anything - e.g. testUser5 etc.
  //the names don't relate to the accounts directly (only the addresses do)
  const currentUser = 'GanacheAcct4';
  const selectedOpponent = 'GanacheAcct5';
  const fromJson = JSONops._updateDoChallengeJSONinJson(rankingID, currentUser, selectedOpponent, copyconsoletemp);
    var playerObjToTest = fromJson.filter(function(playerObj) {
    return playerObj.NAME === 'GanacheAcct4';
  });
  //console.log('playerObj', playerObjToTest);
  //array index is always [0] cos above only returns 1 object
  expect(playerObjToTest[0].CURRENTCHALLENGERNAME).toEqual('GanacheAcct5');
  expect(playerObjToTest[0].CURRENTCHALLENGERADDRESS).toEqual('0x48DF2ee04DFE67902B83a670281232867e5dC0CC');
})

it('JSONops _updateEnterResultJSON test with CURRENTCHALLENGERADDRESS', async () => {
  //these names could be anything - e.g. testUser5 etc.
  //the names don't relate to the accounts directly (only the addresses do)
  const currentUser = 'GanacheAcct4';
  const selectedOpponent = 'GanacheAcct5';
  const playerNameOnRowClicked = 'GanacheAcct4';
  const selectedOpponentRank = 5;
  const fromJson = JSONops._updateDoChallengeJSONinJson(rankingID, currentUser, selectedOpponent, copyconsoletemp);
    var playerObjToTest = fromJson.filter(function(playerObj) {
    return playerObj.NAME === 'GanacheAcct4';
  });
  //console.log('playerObj', playerObjToTest);
  //array index is always [0] cos above only returns 1 object
  expect(playerObjToTest[0].CURRENTCHALLENGERNAME).toEqual('GanacheAcct5');
  expect(playerObjToTest[0].CURRENTCHALLENGERADDRESS).toEqual('0x48DF2ee04DFE67902B83a670281232867e5dC0CC');
  expect(playerObjToTest[0].CURRENTCHALLENGERID).toEqual(6);
//rankingID, currentUser, currentUserRank, playerNameOnRowClicked, selectedOpponentRank, data)
  const fromJson2 = JSONops._updateEnterResultJSON(rankingID, playerObjToTest[0].NAME, playerObjToTest[0].RANK, playerNameOnRowClicked, selectedOpponentRank, copyconsoletemp);
    //iterate through all the objects in the json and return the one matching 'GanacheAcct4'
    var playerObjToTest2 = fromJson2.filter(function(playerObj) {
    return playerObj.NAME === 'GanacheAcct4';
  });
  //console.log('playerObj', playerObjToTest2);
  //array index is always [0] cos above only returns 1 object
  expect(playerObjToTest[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');
  expect(playerObjToTest[0].CURRENTCHALLENGERADDRESS).toEqual('');
  expect(playerObjToTest[0].CURRENTCHALLENGERID).toEqual(0);

  expect(playerObjToTest2[0].CURRENTCHALLENGERNAME).toEqual('AVAILABLE');
  expect(playerObjToTest2[0].CURRENTCHALLENGERADDRESS).toEqual('');
  expect(playerObjToTest2[0].CURRENTCHALLENGERID).toEqual(0);
})



//helper functions
function filterJson(json, filterText){
  return json.updatedUserJSON.filter(getDetailsByNameFromJson);
  function getDetailsByNameFromJson(result) {
    //console.log('result', result)
    //avoid the first (anomolous object in the array)
    if(result.STATUS !== 'NEW'){
    //   return null;
    // }else{
      return result.NAME === filterText;
    }
  }
}
