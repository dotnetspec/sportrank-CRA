import React from 'react'
//import { BrowserRouter } from 'react-router-dom'
//import sinon from 'sinon'
//import { stub, sinon } from 'sinon';
//import App from '../../Logic/App'
//import GlobalRankings from '../../Logic/GlobalRankings'
//import chai from 'chai'
//import GlobalRankingViewBtn  from '../buttons/GlobalRankingViewBtn'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn';
import {renderWithRouter} from '../../../utils'

import Header  from '../Header'
import renderer from 'react-test-renderer'
//import { shallow, mount } from 'enzyme';
//import icon from './img/ross.png'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debug
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-dom'
import '@testing-library/dom'
import {user, userAccounts} from '../../../../../../cypress/fixtures/userAccounts'
import {specificrankingdata} from '../../../../../../cypress/fixtures/specificrankingdata'
import {cleanedUpSRContractData} from '../../../../../../cypress/fixtures/cleanedUpSRContractData'



beforeEach(cleanup)
//ensure descrbe blocks don't overlap
describe('Header UI', () => {

//setup the user account info passed from app

const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';

//currently the app refers to a userAccount and a user so tests
//setup for both
//need these setup vars to be within one descrbe block

          //for the functions that get sent in props
          function dummyFunction(){
                  return null;
                }

          //mock json:
          // const rankingJSONdata =
          // [
          //       {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":6,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":1},
          // ]

          const props  = {
            userAccounts: cleanedUpSRContractData,
            username: user.username,
            account: testAccountPlayer1Rinkeby,
            onAfterUserUpdate: (e) => dummyFunction(),
            rankingJSONdata: specificrankingdata,
            balance: 4.0
          }
      //do the tests
    it('RTL - check initial display', () => {
             const { getByText } = renderWithRouter(<Header {...props}/>);
             expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings')
             expect (getByText(/Update Profile/i)).toBeInTheDocument();
             expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
      });

    it('Profile link display', () => {
            const { debug, getByRole, getByTestId } = renderWithRouter(<Header {...props}/>);
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

     xit('Account dropdown on click Create New display', () => {

           const { debug, getByRole, getByTestId } = renderWithRouter(<Header {...props}/>);

           fireEvent.click(getByTestId("menuitem0"));
           // const dialogContainer = getByRole('menuitem0')

    });

    xit('specificRankingOptionBtns - true displays', () => {
      const props  = {
        userAccounts: userAccounts,
        username: user.username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: true,
        isCurrentUserActive: true
      }
          const { getByText } = renderWithRouter(<Header {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
    });


    xit('specificRankingOptionBtns - false does not display', () => {
      const props  = {
        userAccounts: userAccounts,
        usernameinprofile: user.username,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: false,
        isCurrentUserActive: true
      }
          const { getByText } = renderWithRouter(<Header {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
    });

  xit('RTL - isCurrentUserActive false - Display Re-Activate', () => {
    const props  = {
      userAccounts: userAccounts,
      username: user.username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: false
    }
        renderWithRouter(<Header {...props}/>);
        //const { debug } = renderWithRouter(<Header {...props}/>);
        //debug();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/Re-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: green;');
  });

  xit('RTL - isCurrentUserActive true - Display De-Activate', () => {
    const props  = {
      userAccounts: userAccounts,
      username: user.username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      isCurrentUserActive: true
    }
        renderWithRouter(<Header {...props}/>);
        //const { debug } = renderWithRouter(<Header {...props}/>);
        //debug();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: red;');
  });


  xit('RTL - isCurrentUserActive true', () => {
    const props  = {
      userAccounts: userAccounts,
      username: user.username,
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
});
