import {
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import ListAllRankingsBtn from '../buttons/ListAllRankingsBtn'
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

//this is the 'View' btn on the initial glabol rnakings page
// it('Is View btn rendered?', async () => {
//
// })

afterEach(cleanup);

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const historyMock = { push: jest.fn() };
  const _handleRankingList = jest.fn();

  //const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

  const { getByText } = render(<ListAllRankingsBtn
    _handleRankingList={_handleRankingList}
    history={historyMock}
    />);

  fireEvent.click(getByText(/List All Rankings/i));
  expect(_handleRankingList).toHaveBeenCalled();
});
