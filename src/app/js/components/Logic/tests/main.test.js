import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main  from '../Main'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import { render, fireEvent, cleanup,
   waitForElement, within, wait} from '@testing-library/react'
import {renderWithRouter} from '../../../utils'
import 'jest-dom/extend-expect'
import axiosMock  from 'axios'
import {fetchMock} from 'fetch-mock'
import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId, asyncFetch } from '../../SideEffects/io/Jsonio';
//import { MemoryRouter as Router } from 'react-router-dom';
// import {
//   // Tip: all queries are also exposed on an object
//   // called "queries" which you could import here as well
//   wait,
// } from '@testing-library/dom'

//Props from App:

/*
user={this.state.user}
contactno={this.state.contactno}
email={this.state.email}
description={this.state.description}
account={this.state.account}
userAccounts={this.state.userAccounts}
error={this.state.error}
setspecificRankingOptionBtnsCB={(e) => this.handleChildClick()}
specificRankingOptionBtns={this.state.specificRankingOptionBtns}
onAfterUserUpdate={(e) => _loadCurrentUserAccounts()}
onError={(err, source) => this._onError(err, source)}
rankingJSONdata={this.state.data}
rankingListJSONdata={this.state.rankingListData}
contactNoCB={this.state.contactNoCB}
emailCB={this.state.emailCB}
rank={this.state.rank}
isCurrentUserActive={this.state.isCurrentUserActive}
isRankingIDInvalid={this.state.isRankingIDInvalid}
newrankId={this.state.newrankId}
rankingDefault={this.state.rankingDefault}
getNewRankingID={(e) => this.getNewRankId()}
newrankId={this.newrankId.bind(this)}
viewingOnlyCB={this.viewingOnlyCB.bind(this)}
isUserInJson={this.state.isUserInJson}
loadingJSON={this.state.loadingJSON}

*/

afterEach(cleanup);

jest.mock('axios');

//ensure describe blocks don't overlap
//default approach is RTL unless otherwise specified
describe('<Main/> ', () => {

  const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';
  const globalRankingData = [{RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}]
  const specificRankingData = [
    {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":6,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":1},
    {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
    {"id":3,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
    {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
    {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
  ];

  const url = '/';

  const userAccountsArray =
   [
       { address: testAccountPlayer1Rinkeby,
         balance: 2.0,
         user: {
            username: 'player1',
            description: "test2",
            email: "test@test.com",
            owner: "0x847700B781667abdD98E1393420754E503dca5b7",
            picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
            rankingDefault: "5c81c1e944e81057efe3e2c8"
         }
       }
     ];

     const userOjb = {
               username: 'player1',
               description: "test2",
               email: "test@test.com",
               owner: testAccountPlayer1Rinkeby,
               picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
               rankingDefault: "5c81c1e944e81057efe3e2c8"
          };

//Functions:
const historyMock = { push: jest.fn() };
const onClick = jest.fn();
const onAfterUserUpdate = jest.fn();
const newrankId = jest.fn();
const viewingOnlyCB = jest.fn();

//Properties:

          const props  = {
            userAccounts: userAccountsArray,
            //user: userOjb,
            rankingListJSONdata: globalRankingData,
            account: testAccountPlayer1Rinkeby,
            user: 'player1',
            setspecificRankingOptionBtnsCB: onClick,
            onAfterUserUpdate:onAfterUserUpdate,
            newrankId:newrankId,
            viewingOnlyCB:viewingOnlyCB,
            history:historyMock,
            rankingJSONdata: specificRankingData
          }

  it('RTL - check initial display', () => {
        const { getByText  } = renderWithRouter(<Main {...props}/>);
        //exact match with $
        expect (getByText(/mplayer1rank$/i)).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
 });

   it('can fetch', async () => {
     //renderWithRouter(<Main {...props}/>);
     //const rankid = '5bd82af2baccb064c0bdc92a';
     const rankid = '5c81c1e944e81057efe3e2c8';
     let httpStr = 'https://api.jsonbin.io/b/' + rankid + '/latest';
     fetchMock.get(httpStr, { anything: "we like" });
     //const response = await _loadsetRankingListJSONData(rankid);
     const response = await asyncFetch(httpStr);
     const result = await response.json();

     expect(result.anything).toEqual("we like");

     fetchMock.restore();
   });

//NB: ensure go down to the element (<Button>) level not the component (GlobalRankingViewBtn) level
 xit('Loads a specific ranking on view click', async () => {
       const { getByText, getByTestId, debug  } = renderWithRouter(<Main url={url} {...props}/>);
       // const firstRowOfTableViewBtn = getByTestId("0");
       // fireEvent.click(firstRowOfTableViewBtn);
       //expect (getByText(/mplayer1rank/i)).toHaveTextContent('mplayer1');

       //expect (getByText(/mplayer1/i)).toBeInTheDocument();
       //debug();

       axiosMock.get.mockResolvedValueOnce({
         //data: { rankingJSONdata: specificRankingData }
         rankingJSONdata: specificRankingData
       })

       const firstRowOfTableViewBtn = getByTestId("0");
       fireEvent.click(firstRowOfTableViewBtn);

       //expect(axiosMock.get).toHaveBeenCalledTimes(1)
       expect(axiosMock.get).toHaveBeenCalledWith(url)

       const playerListedInRankingNode = await wait(() =>
         getByText(/mplayer1$/i)
       )

       expect(playerListedInRankingNode).toBeInTheDocument();
     });

     xit('Displays a modal on challenge click', () => {
           const { getByText, getByTestId  } = renderWithRouter(<Main {...props}/>);
           const firstRowOfTableViewBtn = getByTestId("0");
           fireEvent.click(firstRowOfTableViewBtn);
           expect (getByText(/Challenge/i)).toBeInTheDocument();
         });
})
