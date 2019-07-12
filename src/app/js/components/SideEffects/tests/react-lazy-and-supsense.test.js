import React from 'react'
import {wait, waitForElement, cleanup} from '@testing-library/react'
import 'jest-dom/extend-expect'
import {renderWithRouter} from '../../../utils'

afterEach(cleanup)

//from:
//https://www.youtube.com/watch?v=lfb5jvHq9c4
const App = React.lazy(() => import ('../../Logic/App'))

// jest.mock('../../Logic/App', () =>
// jest.fn
// )

//currently rendering with real data:
it('renders lazy ', async () => {
  //const _loadCurrentUserAccounts = jest.fn();
  const getandSetDefaultRankingList = jest.fn();
const {debug, getByText} = renderWithRouter(
<React.Suspense fallback='test loading'>
  <App getandSetDefaultRankingList={jest.fn()}/>
</React.Suspense>)
debug();
//following
//https://stackoverflow.com/questions/55088168/react-useeffect-hook-not-calling-mocked-function
requestAnimationFrame(() => {
  //expect(_loadCurrentUserAccounts).toHaveBeenCalled();
  expect(getandSetDefaultRankingList).toHaveBeenCalled();
  expect(getByText(/Sportrank/i)).toBeInTheDocument();
  expect(getByText(/mplayer1rank/i)).toBeInTheDocument();
  });
})
