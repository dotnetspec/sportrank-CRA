import React from 'react'
import axiosMock from 'axios'
//import {render, fireEvent, cleanup, wait} from '../'
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {renderWithRouter} from '../../../utils'
import Fetch from '../io/Fetch'

afterEach(cleanup)

jest.mock('axios');

it('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  // Arrange
  axiosMock.get.mockResolvedValueOnce({data: {greeting: 'hello there'}})
  const url = '/greeting'
  const {container, getByText} = renderWithRouter(<Fetch url={url} />)

  // Act
  fireEvent.click(getByText('Fetch'))

  await wait()

  // Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  // this assertion is funny because if the textContent were not "hello there"
  // then the `getByText` would throw anyway... 🤔
  expect(getByText('hello there').textContent).toBe('hello there')
  expect(container.firstChild).toMatchSnapshot()
})
