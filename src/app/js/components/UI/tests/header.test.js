import React from 'react'
import { BrowserRouter } from 'react-router-dom'
//import sinon from 'sinon'
import { stub, sinon } from 'sinon';
import App from '../../Logic/App'
//import GlobalRankings from '../../Logic/GlobalRankings'
//import chai from 'chai'
//import GlobalRankingViewBtn  from '../buttons/GlobalRankingViewBtn'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn';
import {renderWithRouter} from '../../../utils'

import Header  from '../Header'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
//import icon from './img/ross.png'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'

beforeEach(cleanup)

describe('Header UI', () => {

 it('Shallowrenders header.js', () => {
   const header = shallow(<Header />);
  expect(header).toMatchSnapshot();
 });

 fit('RTL - check initial display', () => {
   const userAccountsArray =
   //const firstArrayObject =
    [
        { address: '0x847700B781667abdD98E1393420754E503dca5b7',
          balance: 2.0,
          user: {
             username: 'player1',
             description: "test2",
             email: "test@test.com",
             owner: "0x847700B781667abdD98E1393420754E503dca5b7",
             picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
             rankingDefault: "5c81c1e944e81057efe3e2c8"
          }
        }
      ];

      const userOjb = {
                username: 'player1',
                description: "test2",
                email: "test@test.com",
                owner: "0x847700B781667abdD98E1393420754E503dca5b7",
                picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
                rankingDefault: "5c81c1e944e81057efe3e2c8"
           };
        //seems don't need this now that Array.isArray tells us that it's an array
        //const dataAsArray = Array.from(firstArrayObject);
          //const dataAsArray = firstArrayObject;

   const props  = {
     userAccounts: userAccountsArray,
     user: userOjb,
     account: '0x847700B781667abdD98E1393420754E503dca5b7'
   }
       const { getByText } = renderWithRouter(<Header {...props}/>);
       //expect (getByTestId('UpdateProfile')).toBeInTheDocument();
       //expect (getByText(/address/i)).toBeInTheDocument();
       //const aboutAnchorNode = getByText(/about/i)
       expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings')
       expect (getByText(/Update Profile/i)).toBeInTheDocument();
});

   it.skip('should handle a child click (View) and change state of specificRankingOptionBtns in app.js', () => {
     const onParentClick = stub();
     const wrapper = shallow(<App onChildClick={onParentClick} />);
     wrapper.find("Child").prop('onChildClick')('foo');
     //param '1' is row number
     //wrapper.find(PlayerStatusBtn).prop('PlayerStatusBtn_clicked')('1');

     expect(onParentClick.callCount).to.be.equal(1);
     // You can also check if the 'foo' argument was passed to onParentClick
   });

//let expect = chai.expect;
 it.skip('clicking menu item',()=>{
      //const items = [{'id':1,'text':'hello'},{'id':2,'text':'world'}]
      const json = [
      {
        "RANKINGNAME":"testRa1","RANKINGDESC":"testRank","ACTIVE":true,"RANKINGID":"5c6a7cf5a83a2931773847b8"
      }
    ]
      const handleClickStub = sinon.spy()
      const appwrapper = mount(
        <BrowserRouter>
          <App  onChildClick={handleClickStub} rankingListJSONdata={json}/>
        </BrowserRouter>);
      //console.log(appwrapper.state('specificRankingOptionBtns')) // prints false
      //wrapper.find(GlobalRankings).last().simulate('click')
      //const globalRankingswrapper = shallow(<GlobalRankings />);
      const myFakeCallback = () => console.log('Do your treatment here - callback called');
      appwrapper.find('bstable').prop('handlerankingViewButton')(myFakeCallback)
      expect(handleClickStub.calledOnce).to.be.true() // successful
      console.log(appwrapper.state('specificRankingOptionBtns'))  // prints true
       expect(appwrapper.state().specificRankingOptionBtns).to.equal(false);
    })



 it.skip('Displays Active btn if in a ranking list', () => {

   //const props = {user:'player1', picture:''};
   //simulates just the username from the returned 'Results' array
   // const Result = [{username:'player1'}];
   // const userObj = {user: Result[0]};
   // const userAccounts = [{address: "0x847700B781667abdD98E1393420754E503dca5b7"},
   // {balance: "23.746269267999999996"},
   // {user: Result[0]}];
   // const header = renderer.create(
   //   <BrowserRouter location="Home">
   //      <Header user='player1' picture='' userAccounts={userAccounts} />
   //   </BrowserRouter>);
   const header = shallow(<Header location='home/@player1'/>);
   // const header = mount(
   //    <BrowserRouter location="home/@player1">
   //        <Header  location='home/@player1'/>
   //        </BrowserRouter>
   //    );
     //browserHistory.push('/login');
     expect(header.state().specificRankingOptionBtns).to.equal(false);
     //expect(header.state('specificRankingOptionBtns')).toEqual(false);

});
//    const jsondata = [
//    {
//      "RANKINGNAME":"testRa1","RANKINGDESC":"testRank","ACTIVE":true,"RANKINGID":"5c6a7cf5a83a2931773847b8"
//    }];
//   const wrapper = shallow(<BootstrapTable data={jsondata}/>);
//
// //expect(wrapper.find('.clicks-0').length).to.equal(1);
// wrapper.find('View').simulate('click');
// const header = shallow(<Header />);
//    header
//      .find('PlayerStatusBtn')
//      //.simulate('click');
//
//    expect(header.state('playerActive')).toEqual(true);


//  it.only('should update PlayerStatusBtn state with button click', () => {
//    const historyMock = { push: jest.fn() };
//    const component = mount(
//        <Home />
//    );
//
//    //has the logic prevented the playerStatus from displaying?
// expect(shallow(<Header />).find('playerStatus').exists()).toBe(true)
//
//    //wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
//
//    const header = shallow(<Header />);
//    header
//      .find('PlayerStatusBtn')
//      .simulate('click');
//
//    expect(header.state('playerActive')).toEqual(false);
//  })
//simulating changes (e.g. to form input)
//  .find('#name')
// .simulate('change', { target: { value: 'Ross' } });
});
