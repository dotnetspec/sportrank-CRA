// src/__tests__/example.js
// query utilities:
import {
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import DoChallenge from '../DoChallenge'
import React from 'react'
import { render, cleanup, fireEvent, getByText, debug  } from '@testing-library/react'
import {renderWithRouter} from '../../../utils'
import {ranking1} from '../../../../../../cypress/fixtures/ranking1'
//import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'
//import { getDefaultUserAccountFromAddress } from '../io/web3io';
import * as web3defaultAccount from '../../SideEffects/io/web3defaultAccount';
import * as  sendEthTransaction  from '../../SideEffects/io/sendEthTransaction';
//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

afterEach(cleanup);

const historyMock = { push: jest.fn() };
const onAfterChallenge = jest.fn();
const _handleClick = jest.fn();
const data = ranking1;
const selectedOpponentName = 'player3';
//const closeResultModal = jest.fn();
// const updateTextCB =
// const newrankIdCB =

const address = '0x847700B781667abdD98E1393420754E503dca5b7';

const userOjb = {
          username: 'player1',
          description: "test2",
          email: "test@test.com",
          //owner: testAccountPlayer1Rinkeby,
          picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          rankingDefault: "5c81c1e944e81057efe3e2c8"
     };

     const props  = {
       username: 'player1',
       history: historyMock,
       onAfterChallenge: onAfterChallenge,
        data: data,
        selectedOpponentName: selectedOpponentName,
        user: userOjb
        // ,
        // updateTextCB:
        // newrankIdCB:
     }

it('DoChallenge correctly displays initially', async () => {
  const { getByText} = renderWithRouter(<DoChallenge
  {...props}
  />)
  expect (getByText(/Post Challenge/i)).toBeInTheDocument();
})

//TODO:
xit('De-activate player on click', async () => {

  const spy = jest.spyOn(web3defaultAccount, 'getWeb3defaultAccount');
  spy.mockReturnValue(address);
  const spy2 = jest.spyOn(sendEthTransaction, 'sendEthTransaction');
  spy2.mockReturnValue(address);

  console.log('data', data);

  const { getByText} = renderWithRouter(<DoChallenge
  {...props}
  />)
  fireEvent.click(getByText(/Post Challenge/i));

  //expect(_handleClick.mock.calls.length).toBe(1);
  //expect(_handleClick).toHaveBeenCalled();
  await wait(() => expect(_handleClick).toHaveBeenCalled());
  //expect(closeResultModal).toHaveBeenCalled();
})
