import React from 'react'
import {wait, waitForElement, cleanup} from '@testing-library/react'
import 'jest-dom/extend-expect'
import {renderWithRouter} from '../../../utils'

afterEach(cleanup)

//from:
//https://www.youtube.com/watch?v=lfb5jvHq9c4
const App = React.lazy(() => import ('../../Logic/App'))

// jest.mock('../../Logic/App', () =>
//
// jest.fn
//
// )

//currently rendering with real data:
xit('renders lazy ', async () => {
const {debug, getByText} = renderWithRouter(
<React.Suspense fallback='test loading'>
  <App />
</React.Suspense>)
debug();
const lazyElement = await waitForElement(() => getByText(/Sportrank/i));
const tableElement = await waitForElement(() => getByText(/mplayer1rank/i));
//await wait()
//expect(getByText(/mplayer1rank/i)).toBeInTheDocument();
expect(lazyElement).toBeInTheDocument();
expect(tableElement).toBeInTheDocument();
})
