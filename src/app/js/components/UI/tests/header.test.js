import React from 'react'
import DeactivatePlayerBtn  from '../buttons/DeactivatePlayerBtn'
import Header  from '../Header'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
//import icon from './img/ross.png'
describe('testing navigation', () => {
 it('deactivate btn renders correctly', () => {
   const deactivateplayerbtn = renderer
    .create(
       <DeactivatePlayerBtn
         username='player1' />
     ).toJSON();
  expect(deactivateplayerbtn).toMatchSnapshot();
 });

 it('renders whole header.js correctly', () => {
   const header = shallow(<Header />);
  expect(header).toMatchSnapshot();
 });


});
