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

fit('PlayerStatusBtn correctly displays initial status', async () => {
  //const playerStatusBtnText = 'Re-Activate?'

  const props  = {
    isCurrentUserActive:true
  }

  const historyMock = { push: jest.fn() };

  const { getByTestId} = render(<PlayerStatusBtn username='player1'
  history={historyMock}
  
  {...props}
  />)
  //const inputNode = getByPlaceholderText('De-Activate?')

  //inputNode.btnText = playerStatusBtnText

  expect(getByTestId('activatebtn-input')).toHaveTextContent(
    'De-Activate?'
  )

  // Get elements by their text, just like a real user does.
  //getByText(container, 'De-Activate?').click()
  //inputNode.click();

  // getByTestId and queryByTestId are an escape hatch to get elements
  // by a test id (could also attempt to get this element by it's text)
  // jest snapshots work great with regular DOM nodes!
  //expect(inputNode).toMatchSnapshot()
})

test('PlayerStatusBtn text on click', async () => {
  const playerStatusBtnText = 'Re-Activate?'

  const historyMock = { push: jest.fn() };

  const { getByPlaceholderText, getByTestId} = render(<PlayerStatusBtn username='player1'
  history={historyMock}
  />)
  const inputNode = getByPlaceholderText('De-Activate?')

  inputNode.btnText = playerStatusBtnText

  // Get elements by their text, just like a real user does.
  //getByText(container, 'De-Activate?').click()
  inputNode.click();

  await wait(() =>
    expect(getByTestId('activatebtn-input')).toHaveTextContent(
      playerStatusBtnText
    )
  )
  // getByTestId and queryByTestId are an escape hatch to get elements
  // by a test id (could also attempt to get this element by it's text)
  // jest snapshots work great with regular DOM nodes!
  expect(inputNode).toMatchSnapshot()
})
