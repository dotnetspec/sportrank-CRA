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

import {specificrankingdata} from '../../../../../../test-fixtures/jsonbin/specificrankingdata'
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
  const globalRankingData = [{RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}];

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
            rankingJSONdata: specificrankingdata
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

//REVIEW: this passed when specificrankingdata not properly defined
       axiosMock.get.mockResolvedValueOnce({
         //data: { rankingJSONdata: specificRankingData }
         rankingJSONdata: specificrankingdata
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
