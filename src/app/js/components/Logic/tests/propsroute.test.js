import React from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App  from '../App'
import PropsRoute  from '../PropsRoute'
import Error from '../Error'
import GlobalRankings from '../GlobalRankings'
//import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';

//jest.mock('../');

xit('invalid path should redirect to whoopsie', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MemoryRouter>

  );
  expect(wrapper.find(GlobalRankings)).toHaveLength(0);
  expect(wrapper.find(Error)).toHaveLength(1);
});
