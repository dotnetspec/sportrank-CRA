import React from 'react'
import DeactivatePlayerBtn  from '../buttons/DeactivatePlayerBtn'
import Header  from '../Header'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
//import icon from './img/ross.png'
describe('testing navigation', () => {

  it('should check if DeactivatePlayerBtn_clicked', () => {
    const historyMock = { push: jest.fn() };
    const component = renderer.create(<DeactivatePlayerBtn
      username='player1' history={historyMock}/>)
    expect(component.toJSON()).toMatchSnapshot()

    // getInstance is returning the `this` object you have in your component
    // meaning anything accessible on `this` inside your component
    // can be accessed on getInstance, including props!
    const instance = component.getInstance()
    expect(instance.state).toMatchSnapshot('initial state')

    instance._handleDeactivatePlayer({ target: { DeactivatePlayerBtn_clicked: true } })
    expect(instance.state).toMatchSnapshot('updated state')
  })


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

 it('should update deactivate btn state with button click', () => {
   //REVEIW: need to snd all this test data?
   //just setState and do deactivate sepaately
   // const testJsondata = '[{"id":1,"NAME":"player1","CONTACTNO":"12345678","EMAIL":"p1@test.com","RANK":2,"ACCOUNT":"0xd04b71a8eddcC67ceEf47FF5ED9ecFe3383D2C28","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player3","DESCRIPTION":"p1","ACTIVE":true,"DATESTAMP":1552368743582},{"DATESTAMP":1552368743582,"ACTIVE":true,"DESCRIPTION":"p3","CURRENTCHALLENGERNAME":"player1","CURRENTCHALLENGERID":1,"ACCOUNT":"0xcE2aF83b46015d4731Ab3deef8bee01261DF7272","RANK":1,"EMAIL":"test3@test.com","CONTACTNO":"12345678","NAME":"player3","id":2},{"DATESTAMP":1552367186957,"ACTIVE":true,"DESCRIPTION":"mtester","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xF10474f12c7E25420304454cC3Cd33A868CAf2E0","RANK":3,"EMAIL":"mtest1@test.com","CONTACTNO":"12345668","NAME":"mplayer1","id":3}]'

   const historyMock = { push: jest.fn() };
   const component = mount(
   //   //JSONops.deactivatePlayer(this.props.newrankIdCB, this.props.rankingJSONdata, this.props.user, this.props.account);
   //   <DeactivatePlayerBtn newrankIdCB='5c87394bbb08b22a75685941' rankingJSONdata={testJsondata}
   //     username='player1' account='0x847700B781667abdD98E1393420754E503dca5b7'/>

       <DeactivatePlayerBtn  username='player1' history={historyMock} />
   );
   component
     .find('DeactivatePlayerBtn')
     .simulate('click');

   expect(component.state('DeactivatePlayerBtn_clicked')).toEqual(true);
   component.unmount();
 })
//simulating changes (e.g. to form input)
//  .find('#name')
// .simulate('change', { target: { value: 'Ross' } });
});
