import React from 'react'
import {renderWithRouter} from '../../../utils'
import GlobalRankings  from '../GlobalRankings'

import {
  //render,
  wait,
  fireEvent,
  cleanup,
//waitForElement,
  //debug
} from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {specificRankingData} from '../../../../../../test-fixtures/jsonbin/specificRankingData'
import {cleanedUpSRContractData} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'
import {globalRankings} from '../../../../../../test-fixtures/jsonbin/globalRankings'
//import {singleGlobalRow} from '../../../../../../test-fixtures/jsonbin/singleGlobalRow'

beforeEach(cleanup)
//ensure descrbe blocks don't overlap
describe('GlobalRankings UI', () => {
//setup the user account info passed from app
const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';

//for the functions that get sent in props
function dummyFunction(){
        return null;
      }
      const historyMock = { push: jest.fn() };

      // let row = {};
      // row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"};
      // function setnewrankIdCB(row.RANKINGID){
      //
      // }
// function setspecificRankingOptionBtnsCB(){
//         return null;
//       }

const props  = {
  //onAfterUserUpdate: (e) => dummyFunction(),
  rankingJSONdata: specificRankingData,
  rankingListJSONdata: globalRankings
}
      //do the tests
    it('RTL - check initial display', () => {
             const { getByText, debug } = renderWithRouter(<GlobalRankings {...props}/>);
             //expect(getByText(/Home\/List All/i)).toHaveTextContent('Home\/List All')
             // console.log(globalRankings, props.rankingListJSONdata)
             //debug();
             expect(getByText(/mplayer1ra/i)).toBeInTheDocument();
             expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
             // const dialogContainer2 = getByTestId("menuitem1")
             // //the querySelector (span) has to be nested within the dialogContainer
             // expect(dialogContainer.querySelector('span').innerHTML).toBe('testuser1')
      });

    //NB: props need to be specific to these tests
    //REVIEW: not sure this possible due to header not being included ...
    xit('specificRankingOptionBtns - true displays on viewbtn click', async () => {
      //const onClick = jest.fn();
      const props  = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: true,
        setspecificRankingOptionBtnsCB: (e) => dummyFunction(),
        setnewrankIdCB: (e) => dummyFunction(),
        setviewingOnlyCB: (e) => dummyFunction(),
        isCurrentUserActive: true,
        isUserInJson: true,
        rankingJSONdata: specificRankingData,
        rankingListJSONdata: globalRankings,
        history: historyMock
      }
          const { getByText, getByTestId, debug } = renderWithRouter(<GlobalRankings {...props}/>);
          //debug();
          //fireEvent.click(getByTestId('0'));
          await wait(() => getByTestId("0")); fireEvent.click(getByTestId("0"));
          //await wait(() => expect(getByText(/Create An Account Name/i)).toBeInTheDocument());
          expect(getByText(/Create An Account Name/i)).toBeInTheDocument();
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/Home\/List All/i)).toBeInTheDocument()
    });

    xit('specificRankingOptionBtns - false does not display', () => {
      const props  = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: false,
        isCurrentUserActive: true,
        isUserInJson: true
      }
          const { getByText } = renderWithRouter(<GlobalRankings {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/Home\/List All/i)).toBeInTheDocument()
    });

  xit('RTL - isCurrentUserActive false - Display Re-Activate', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: false,
      isUserInJson: true
    }
        renderWithRouter(<GlobalRankings {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/Re-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: green;');
  });

  xit('RTL - isCurrentUserActive true - Display De-Activate', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: true,
      isUserInJson: true
    }
        renderWithRouter(<GlobalRankings {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: red;');
  });

  xit('RTL - isCurrentUserActive true, isUserInJson: false', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: true,
      isUserInJson: false
    }
        renderWithRouter(<GlobalRankings {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
  });
});
