import React from 'react'
import {wait, waitForElement, cleanup} from '@testing-library/react'
import 'jest-dom/extend-expect'
//import Main from '../../Logic/Main'
//import App from '../../Logic/App'
import {renderWithRouter} from '../../../utils'

afterEach(cleanup)

//from:
//https://www.youtube.com/watch?v=lfb5jvHq9c4
const App = React.lazy(() => import ('../../Logic/App'))

it('renders lazy ', async () => {
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
