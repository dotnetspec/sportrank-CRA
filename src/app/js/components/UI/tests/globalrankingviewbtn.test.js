import {
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect'
import GlobalRankingViewBtn from '../buttons/GlobalRankingViewBtn'
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

//this is the 'View' btn on the initial glabol rnakings page

afterEach(cleanup);

it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const historyMock = { push: jest.fn() };
  const onClick = jest.fn();
  const onAfterUserUpdate = jest.fn();
  const newrankIdCB = jest.fn();
  const viewingOnlyCB = jest.fn();
  const parentCallback = jest.fn();

  const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}
  const { getByText } = render(<GlobalRankingViewBtn
    onChildClick={onClick}
    row={row}
    onAfterUserUpdate={onAfterUserUpdate}
    newrankIdCB={newrankIdCB}
    viewingOnlyCB={viewingOnlyCB}
    history={historyMock}
    parentCallback={parentCallback}
    />);

  fireEvent.click(getByText(/View/i));
  expect(onClick).toHaveBeenCalled();
  //expect(onAfterUserUpdate).toHaveBeenCalled();
  //expect(newrankIdCB).toHaveBeenCalled();
  expect(viewingOnlyCB).toHaveBeenCalled();
  expect(parentCallback).toHaveBeenCalled();
});
