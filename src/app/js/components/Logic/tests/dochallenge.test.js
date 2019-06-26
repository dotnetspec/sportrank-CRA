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

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

afterEach(cleanup);

const historyMock = { push: jest.fn() };
const onAfterChallenge = jest.fn();
const _handleClick = jest.fn();
const data = ranking1;
const selectedOpponentName = 'player3';
// const updateTextCB =
// const newrankIdCB =

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

  console.log('data', data);

  const { getByText} = renderWithRouter(<DoChallenge
  {...props}
  />)
  fireEvent.click(getByText(/Post Challenge/i));

  //expect(_handleClick.mock.calls.length).toBe(1);
  //expect(_handleClick).toHaveBeenCalled();
  expect(onAfterChallenge).toHaveBeenCalled();
})
