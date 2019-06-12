// src/__tests__/example.js
// query utilities:
import {
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn'
import React from 'react'
import { render, cleanup } from '@testing-library/react'

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

afterEach(cleanup);

it('PlayerStatusBtn correctly displays initial status', async () => {
const historyMock = { push: jest.fn() };

  const props  = {
    isCurrentUserActive: true,
    username: 'player1',
    history: historyMock
  }

  const { getByTestId} = render(<PlayerStatusBtn
  {...props}
  />)

  expect(getByTestId('activatebtn-input')).toHaveTextContent(
    'De-Activate?'
  )
})

it('PlayerStatusBtn text correct with isCurrentUserActive = false', async () => {
    //const isCurrentUserActiveCB = jest.fn();
    const historyMock = { push: jest.fn() };
    const props  = {
      isCurrentUserActive: false,
      username: 'player1',
      //isCurrentUserActiveCB: isCurrentUserActiveCB,
      history: historyMock
    }

    const { getByTestId } = render(<PlayerStatusBtn
    {...props}
    />)

   const inputNode = getByTestId('activatebtn-input')

   expect(inputNode).toHaveTextContent('Re-Activate?')
   expect(inputNode).toMatchSnapshot()
})
