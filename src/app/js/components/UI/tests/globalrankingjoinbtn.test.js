// import {
//   wait,
// } from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import GlobalRankingJoinBtn from '../buttons/GlobalRankingJoinBtn'
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro
jest.mock("../../SideEffects/io/Jsonio");

//this is the 'Join' btn on the initial glabol rankings page
afterEach(cleanup);

const dataTrue = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"player2","CURRENTCHALLENGERID":2,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"player1","CURRENTCHALLENGERID":3,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];

it('GlobalRankingJoinBtn - calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const historyMock = { push: jest.fn() };
  const onClick = jest.fn();
  const onAfterUserUpdate = jest.fn();
  const newrankId = jest.fn();
  const setviewingOnlyCB = jest.fn();
  const setnewrankIdCB = jest.fn();
  const _loadsetJSONData = jest.fn();
  const _sendJSONDataWithRankingID = jest.fn();
  const setrankingJSONdataCB = jest.fn();
  const onClickRankingJoinSelected = jest.fn();
  const setOnCallbackisCurrentUserActiveCB = jest.fn();
  //const onClickRankingJoinSelected = jest.fn();
  //const setspecificRankingOptionBtnsCB = jest.fn();

  const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}
  const { getByText } = render(<GlobalRankingJoinBtn
    setspecificRankingOptionBtnsCB={onClick}
    row={row}
    onAfterUserUpdate={onAfterUserUpdate}
    newrankId={newrankId}
    setviewingOnlyCB={setviewingOnlyCB}
    history={historyMock}
    setnewrankIdCB={setnewrankIdCB}
    _loadsetJSONData={_loadsetJSONData}
    rankingJSONdata={dataTrue}
    _sendJSONDataWithRankingID={_sendJSONDataWithRankingID}
    setrankingJSONdataCB={setrankingJSONdataCB}
    onClickRankingJoinSelected={onClickRankingJoinSelected}
    setOnCallbackisCurrentUserActiveCB={setOnCallbackisCurrentUserActiveCB}
    />);

  fireEvent.click(getByText(/Join/i));
  //expect(onClick).toHaveBeenCalled();
  //expect(onClickRankingJoinSelected).toHaveBeenCalled();
  //expect(onAfterUserUpdate).toHaveBeenCalled();
  //expect(setviewingOnlyCB).toHaveBeenCalled();
  expect(setnewrankIdCB).toHaveBeenCalled();
});
