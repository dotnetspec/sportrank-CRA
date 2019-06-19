import React from 'react'
import { BrowserRouter } from 'react-router-dom'
//import sinon from 'sinon'
import { stub, sinon } from 'sinon';
import App from '../../Logic/App'
//import GlobalRankings from '../../Logic/GlobalRankings'
//import chai from 'chai'
//import GlobalRankingViewBtn  from '../buttons/GlobalRankingViewBtn'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn';
import {renderWithRouter} from '../../../utils'

import Header  from '../Header'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
//import icon from './img/ross.png'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-dom'
import '@testing-library/dom'

beforeEach(cleanup)

//ensure descrbe blocks don't overlap
describe('Header UI', () => {

//setup the user account info passed from app

const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';

//currently the app refers to a userAccount and a user so tests
//setup for both
//need these setup vars to be within one descrbe block
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

      //do the tests
       it('RTL - check initial display', () => {
         const props  = {
           userAccounts: userAccountsArray,
           user: userOjb,
           account: testAccountPlayer1Rinkeby
         }
             const { getByText } = renderWithRouter(<Header {...props}/>);
             expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings')
             expect (getByText(/Update Profile/i)).toBeInTheDocument();
             expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
      });

    it('specificRankingOptionBtns - true displays', () => {
      const props  = {
        userAccounts: userAccountsArray,
        user: userOjb,
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


    it('specificRankingOptionBtns - false does not display', () => {
      const props  = {
        userAccounts: userAccountsArray,
        user: userOjb,
        account: testAccountPlayer1Rinkeby,
        specificRankingOptionBtns: false,
        isCurrentUserActive: true
      }
          const { getByText } = renderWithRouter(<Header {...props}/>);
          expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
          expect(getByText(/Update Profile/i)).toBeInTheDocument();
          expect(getByText(/List All Rankings/i)).toBeInTheDocument()
    });

  it('RTL - isCurrentUserActive false', () => {
    const props  = {
      userAccounts: userAccountsArray,
      user: userOjb,
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

  it('RTL - isCurrentUserActive true', () => {
    const props  = {
      userAccounts: userAccountsArray,
      user: userOjb,
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
});
