// src/__tests__/example.js
// query utilities:
import {
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import DeactivatePlayer from '../DeactivatePlayer'
import React from 'react'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import {renderWithRouter} from '../../../utils'

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

afterEach(cleanup);

it('DeactivatePlayer correctly displays initial status', async () => {
const historyMock = { push: jest.fn() };

  const props  = {
    isCurrentUserActive: true,
    username: 'player1',
    history: historyMock
  }

  const { getByTestId} = renderWithRouter(<DeactivatePlayer
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

    const { getByTestId } = renderWithRouter(<DeactivatePlayer
    {...props}
    />)

   const inputNode = getByTestId('activatebtn-input')

   expect(inputNode).toHaveTextContent('Re-Activate?')
   expect(inputNode).toMatchSnapshot()
})

it('PlayerStatusBtn display on click', async () => {
  const historyMock = { push: jest.fn() };
  const _handleChangeStatusPlayerBtnText = jest.fn();
  const isCurrentUserActiveCB = jest.fn();
  const props  = {
    isCurrentUserActive: true,
    isCurrentUserActiveCB: isCurrentUserActiveCB,
    //user: {username: 'player1'},
    username: 'player1',
    history: historyMock
  }

  const { getByTestId} = renderWithRouter(<DeactivatePlayer
  {...props}
  />)
  fireEvent.click(getByTestId('activatebtn-input'));

  // expect(getByTestId('activatebtn-input')).toHaveTextContent(
  //   'Re-Activate?'
  // )
  //expect(_handleChangeStatusPlayerBtnText.mock.calls.length).toBe(1);
  expect(isCurrentUserActiveCB).toHaveBeenCalled();
})
