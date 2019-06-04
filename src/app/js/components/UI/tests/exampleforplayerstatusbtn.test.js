// src/__tests__/example.js
// query utilities:
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn'
import React from 'react'
import { render } from '@testing-library/react'



function getExampleDOM() {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div')
  div.innerHTML = `
    <label for="username">Username</label>
    <input id="username" />
    <button>Print Username</button>
  `
  const button = div.querySelector('button')
  const input = div.querySelector('input')
  button.addEventListener('click', () => {
    // let's pretend this is making a server request, so it's async
    // (you'd want to mock this imaginary request in your unit tests)...
    setTimeout(() => {
      const printedUsernameContainer = document.createElement('div')
      printedUsernameContainer.innerHTML = `
        <div data-testid="printed-username">${input.value}</div>
      `
      div.appendChild(printedUsernameContainer)
    }, Math.floor(Math.random() * 200))
  })
  return div
}

// function getExampleDOMFromReact() {
//   // This is just a raw example of setting up some DOM
//   // that we can interact with. Swap this with your UI
//   // framework of choice 😉
//   const div = document.createElement('div')
//   div.innerHTML = <PlayerStatusBtn />
//   return div
// }

test('examples of some things', async () => {
  const playerStatusBtnText = 'Re-Activate?'
  //const container = getExampleDOMFromReact()

  // Get form elements by their label text.
  // An error will be thrown if one cannot be found (accessibility FTW!)
  //const input = getByLabelText(container, 'dereaactivatebtn')
  //const { getByLabelText, queryByTestId,  getByTestId} = render(<PlayerStatusBtn />)
  //const inputNode = getByLabelText('dereaactivatebtn')

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
    //expect(queryByTestId(container, 'printed-username')).toBeTruthy()
    //expect(queryByTestId('printed-username')).toBeTruthy()
    expect(getByTestId('activatebtn-input')).toHaveTextContent(
      playerStatusBtnText
    )
  )

  // getByTestId and queryByTestId are an escape hatch to get elements
  // by a test id (could also attempt to get this element by it's text)

  // jest snapshots work great with regular DOM nodes!
  expect(inputNode).toMatchSnapshot()
})
