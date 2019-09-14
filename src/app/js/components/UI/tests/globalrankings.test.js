import React from 'react'
import {renderWithRouter} from '../../../utils'
import GlobalRankings  from '../GlobalRankings'

import {
  //render,
  //fireEvent,
  cleanup,
//waitForElement,
  //debug
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-dom'
import '@testing-library/dom'
import {specificrankingdata} from '../../../../../../test-fixtures/jsonbin/specificrankingdata'
import {cleanedUpSRContractData} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'

beforeEach(cleanup)
//ensure descrbe blocks don't overlap
describe('GlobalRankings UI', () => {
//setup the user account info passed from app
const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';

//for the functions that get sent in props
function dummyFunction(){
        return null;
      }
function setuserNameCB (){
        return null;
      }

const props  = {
  userAccounts: cleanedUpSRContractData,
  username: cleanedUpSRContractData[0].username,
  account: testAccountPlayer1Rinkeby,
  onAfterUserUpdate: (e) => dummyFunction(),
  rankingJSONdata: specificrankingdata,
  balance: 4.0,
  setuserNameCB: (e) => setuserNameCB()
}
      //do the tests
    xit('RTL - check initial display', () => {
             const { getByText } = renderWithRouter(<GlobalRankings {...props}/>);
             expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings')
             expect (getByText(/Update Profile/i)).toBeInTheDocument();
             expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
      });

    xit('Profile link display', () => {
            renderWithRouter(<GlobalRankings {...props}/>);
            expect(document.querySelector('[data-testid="usernameinprofilelink"]')).toBeInTheDocument();
            expect(document.querySelector('[data-testid="balinprofilelink"]')).toBeInTheDocument();
     });

    xit('Account dropdown display', () => {
            const { getByTestId } = renderWithRouter(<GlobalRankings {...props}/>);
            expect(document.querySelector('[data-testid="menuitem0"]')).toBeInTheDocument();
            const dialogContainer = getByTestId("menuitem0")
            const dialogContainer2 = getByTestId("menuitem1")
            //the querySelector (span) has to be nested within the dialogContainer
            expect(dialogContainer.querySelector('span').innerHTML).toBe('testuser1')
            expect(dialogContainer2.querySelector('span').innerHTML).toBe('GanacheAcct2')
     });

    //NB: props need to be specific to these tests
    xit('specificRankingOptionBtns - true displays', () => {
      const props  = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: true,
        isCurrentUserActive: true,
        isUserInJson: true
      }
          const { getByText } = renderWithRouter(<GlobalRankings {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
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
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
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
