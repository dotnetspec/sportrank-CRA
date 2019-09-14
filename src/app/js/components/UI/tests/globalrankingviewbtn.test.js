import {
  //wait,
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
  const newrankId = jest.fn();
  const setviewingOnlyCB = jest.fn();
  const setnewrankIdCB = jest.fn();

  const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}
  const { getByText } = render(<GlobalRankingViewBtn
    setspecificRankingOptionBtnsCB={onClick}
    row={row}
    onAfterUserUpdate={onAfterUserUpdate}
    newrankId={newrankId}
    setviewingOnlyCB={setviewingOnlyCB}
    history={historyMock}
    setnewrankIdCB={setnewrankIdCB}
    />);

  fireEvent.click(getByText(/View/i));
  expect(onClick).toHaveBeenCalled();
  //expect(onAfterUserUpdate).toHaveBeenCalled();
  //expect(newrankId).toHaveBeenCalled();
  expect(setviewingOnlyCB).toHaveBeenCalled();
  expect(setnewrankIdCB).toHaveBeenCalled();
});
