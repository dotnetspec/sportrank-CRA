import React from 'react'
import {renderWithRouter} from '../../../utils'
import Header  from '../Header'

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
import {specificRankingData} from '../../../../../../test-fixtures/jsonbin/specificRankingData'
import {cleanedUpSRContractData} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'

beforeEach(cleanup)
//ensure descrbe blocks don't overlap
describe('Header UI', () => {
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
  rankingJSONdata: specificRankingData,
  balance: 4.0,
  setuserNameCB: (e) => setuserNameCB()
}
      //do the tests
    it('RTL - check initial display', () => {
             const { getByText } = renderWithRouter(<Header {...props}/>);
             expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings')
             expect (getByText(/Update Profile/i)).toBeInTheDocument();
             expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
      });

    it('Profile link display', () => {
            renderWithRouter(<Header {...props}/>);
            expect(document.querySelector('[data-testid="usernameinprofilelink"]')).toBeInTheDocument();
            expect(document.querySelector('[data-testid="balinprofilelink"]')).toBeInTheDocument();
     });

    it('Account dropdown display', () => {
            const { getByTestId } = renderWithRouter(<Header {...props}/>);
            expect(document.querySelector('[data-testid="menuitem0"]')).toBeInTheDocument();
            const dialogContainer = getByTestId("menuitem0")
            const dialogContainer2 = getByTestId("menuitem1")
            //the querySelector (span) has to be nested within the dialogContainer
            expect(dialogContainer.querySelector('span').innerHTML).toBe('testuser1')
            expect(dialogContainer2.querySelector('span').innerHTML).toBe('GanacheAcct2')
     });

    //NB: props need to be specific to these tests
    it('specificRankingOptionBtns - true displays', () => {
      const props  = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: true,
        isCurrentUserActive: true,
        isUserInJson: true
      }
          const { getByText } = renderWithRouter(<Header {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
    });

    it('specificRankingOptionBtns - false does not display', () => {
      const props  = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: false,
        isCurrentUserActive: true,
        isUserInJson: true
      }
          const { getByText } = renderWithRouter(<Header {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
    });

  it('RTL - isCurrentUserActive false - Display Re-Activate', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: false,
      isUserInJson: true
    }
        renderWithRouter(<Header {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/Re-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: green;');
  });

  it('RTL - isCurrentUserActive true - Display De-Activate', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: true,
      isUserInJson: true
    }
        renderWithRouter(<Header {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: red;');
  });

  it('RTL - isCurrentUserActive true, isUserInJson: false', () => {
    const props  = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: true,
      isUserInJson: false
    }
        renderWithRouter(<Header {...props}/>);
        expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
  });
});
