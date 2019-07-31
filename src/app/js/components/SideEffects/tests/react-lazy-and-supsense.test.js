import React from 'react'
import {wait, waitForElement, cleanup} from '@testing-library/react'
import 'jest-dom/extend-expect'
import {renderWithRouter} from '../../../utils'
import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId, getDefaultRankingList } from '../../SideEffects/io/Jsonio';
import { _loadCurrentUserAccountsInsideMapping, _loadExternalBalance, _loadCurrentUserAccounts } from '../../SideEffects/io/web3io';


afterEach(cleanup)

//from:
//https://www.youtube.com/watch?v=lfb5jvHq9c4
const App = React.lazy(() => import ('../../Logic/App'))

jest.mock('../io/Jsonio', () =>
jest.fn
)

//currently rendering with real data:
xit('renders lazy ', async () => {
  //const _loadCurrentUserAccounts = jest.fn();
  //const getandSetDefaultRankingList = jest.fn();
  //getandSetDefaultRankingList={jest.fn()}
const {debug, getByText} = renderWithRouter(
    <React.Suspense fallback='... loading'>
      <App />
    </React.Suspense>
)
debug();
//following
//https://stackoverflow.com/questions/55088168/react-useeffect-hook-not-calling-mocked-function
//requestAnimationFrame = async () => {
  expect(_loadCurrentUserAccounts).toHaveBeenCalled();
  expect(await getDefaultRankingList).toHaveBeenCalled();
  expect(getByText(/Sportrank/i)).toBeInTheDocument();
  expect(getByText(/mplayer1rank/i)).toBeInTheDocument();
  //};
})
