import React, {useState} from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App  from '../App'
import PropsRoute  from '../PropsRoute'
import Error from '../Error'
import GlobalRankings from '../GlobalRankings'
//import { expect } from 'chai';
//import utils from '../../../utils'
//import * as jsonops from '../JSONops'
//import JSONops from '../JSONops'
//import * as app from "../App";
import Home from "../Home";
import Main from "../Main";
//import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import { isJSONEmpty } from '../JSONops'; // isJSONEmpty here is a mock function
import * as renderer from 'react-test-renderer'
//import * as pleaseMockMeFuncts from '../Practise'
//auto mock all the exported functions in utils.js
//jest.mock("./JSONops");
//const app = shallow(<App />)
   //const instance = jsonops.instance()
//const addMock = jest.spyOn(JSONops, "isJSONEmpty");


// practice.spec.js
//curly braces because, as a functional component, it is now a 'named' import
import { Practice, setValInPractice } from '../Practice';

// fit('PRACTICE - test a functional component', () => {
//   shallow(<Practice />);
//   expect(Practice.prototype.componentDidMount).toHaveBeenCalled();
// });

xit('should change the state of Practice', () => {
  //const component = renderer.create(<Practice />)
  // const instance = component.getInstance()
  // global.jestExpect(instance.state.value).to.equal('new state');
  //const PracticeFunct = new Practice();
  //const [value, setValue] = useState("");
  expect(Practice.state.value).to.equal('new state');
   //const state = { value: 'new state' };
   //const newState = setValInPractice(state);
   const [value, setValue] = useState("new state");
   //chai expect
   //expect(newState.value).to.equal('new state');
   expect(value).to.equal('new state');
 });

//taken from playerstatusbtn.test.js
xit('PRACTICE - test a functional component', () => {
  //const historyMock = { push: jest.fn() };
  //const component = renderer.create(<Practice history={historyMock}/>)
  const component = renderer.create(<Practice />)
  //console.log(component.instance().state);
  //const component = mount(shallow(<Practice />).get(0))
  expect(component.toJSON()).toMatchSnapshot()
  // getInstance is returning the `this` object you have in your component
  // meaning anything accessible on `this` inside your component
  // can be accessed on getInstance, including props!
  const instance = component.getInstance()

  global.jestExpect(instance.state).toMatchSnapshot('initial state')
  instance.onChange({ target: { value: 'updated stateu' } })
  global.jestExpect(instance.state).toMatchSnapshot('updated state')
});


// it('check the onChange callback', () => {const onChange = jest.fn(),
//   props = { value: '20.01.2018', onChange},
//   DateInputComponent = mount(<DateInput {...props} />).find('input');
//   DateInputComponent.simulate('change', { target: {value: moment('2018-01-22')} });
//   expect(onChange).toHaveBeenCalledWith('22.01.2018');
// });

xit('PRACTICE - invokes `componentDidMount` when mounted', () => {
  jest.spyOn(Practice.prototype, 'componentDidMount');
  shallow(<Practice />);
  expect(Practice.prototype.componentDidMount).toHaveBeenCalled();
  Practice.prototype.componentDidMount.mockRestore();
});

xit('Main - invokes `componentDidMount` when mounted', () => {
  jest.spyOn(Main.prototype, 'componentDidMount');
  shallow(<Main />);
  expect(Main.prototype.componentDidMount).toHaveBeenCalled();
  Main.prototype.componentDidMount.mockRestore();
});


xit("trying jest.mock properties with Practise", () => {
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
});


xit("trying jest.mock with Practise", () => {
  jest.mock('../Practise'); // this will mock all the exported members in ./Service
  //pleaseMockMeFuncts.get.mockResolvedValue(resp);
  //jest.SpyOn(pleaseMockMeFuncts, 'pleaseMockMe');
  // pleaseMockMeFuncts.pleaseMockMe(); // calling mock function
  // expect(pleaseMockMeFuncts.pleaseMockMe).toHaveBeenCalledTimes(1);
  //pleaseMockMe(); // calling mock function
  //expect(pleaseMockMe).toHaveBeenCalledTimes(1);

  // The function was called exactly once
//expect(pleaseMockMeFuncts.pleaseMockMe.mock.calls.length).toBe(1);
});

  xit("trying jest.mock with App", () => {
    // const data = [
    // {
    //   "RANKINGNAME":"testRa1","RANKINGDESC":"testRank","ACTIVE":true,"RANKINGID":"5c6a7cf5a83a2931773847b8"
    // }];
  //app.doAdd(1, 2);
  //getIdNoFromJsonbinResponse
  //app._loadsetJSONData_callback(data);
  //App.newrankIdCB(1234567);
  //app.newrankIdCB(1234567);
  // var user = {};
  // user.username = 'player1';
  // const app = shallow(<Home user={user}/>)
  Main.componentDidMount();
  //JSONops.isPlayerListedInJSON();
  //expect(addMock).toHaveBeenCalledWith();
});

// it("calls math.subtract", () => {
//   app.doSubtract(1, 2);
//   expect(math.subtract).toHaveBeenCalledWith(1, 2);
// });



//REVIEW: practice code:
xit('simple mock function', () => {

  const mockFunct = jest.fn(() => 2);

    expect(mockFunct(1,2)).toBe(2);
    //expect(mockFunct(1,2)).toBe(2);
    expect(mockFunct).toHaveBeenCalledTimes(1);
    expect(mockFunct).toHaveBeenCalledWith(1,2);

  });

  //simple callback function test
  const doAdd = (a, b, callback) => {
      callback(a + b);
    };

xit("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  //toHaveBeenCalledWith means call as arg 3
  expect(mockCallback).toHaveBeenCalledWith(3);
});

// xit('mock function with callback', () => {
//   const mockCallback = jest.fn(x => 42 + x);
//   forEach([0, 1], mockCallback);
//
//   // The mock function is called twice
//   expect(mockCallback.mock.calls.length).toBe(2);
//
//   // The first argument of the first call to the function was 0
//   expect(mockCallback.mock.calls[0][0]).toBe(0);
//
//   // The first argument of the second call to the function was 1
//   expect(mockCallback.mock.calls[1][0]).toBe(1);
//
//   // The return value of the first call to the function was 42
//   expect(mockCallback.mock.results[0].value).toBe(42);
// });
//
// function forEach(items, callback) {
//   for (let index = 0; index < items.length; index++) {
//     callback(items[index]);
//   }
//
// }
