import 'jest-dom/extend-expect'
import ListAllRankingsBtn from '../buttons/ListAllRankingsBtn'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup);

it('calls onListAllChildClick cb function prop on button click', () => {
  const props  = {
onListAllChildClick: jest.fn(),
setResultInfoForDisplayCB: jest.fn()
}

  const { getByText } = render(<BrowserRouter>
    <ListAllRankingsBtn
    {...props}
    />
    </BrowserRouter>);
  fireEvent.click(getByText(/List All Rankings/i));
  //we only test the cb inside the function not the
  //_handleRankingList event function that calls it
  expect(props.onListAllChildClick.mock.calls.length).toBe(1);
});
