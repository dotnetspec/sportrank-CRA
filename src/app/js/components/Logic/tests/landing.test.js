import React from 'react'
//import { BrowserRouter } from 'react-router-dom'
//import App from './app/js/components/App'
//import GlobalRankings from './app/js/components/GlobalRankings'
//import DeactivatePlayerBtn  from '../buttons/DeactivatePlayerBtn'
import Landing  from '../Landing'
// import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
//import icon from './img/ross.png'
describe('Header UI', () => {
     it('Shallowrenders Landing.js', () => {
       const header = shallow(<Landing />);
      expect(header).toMatchSnapshot();
     });
 });
