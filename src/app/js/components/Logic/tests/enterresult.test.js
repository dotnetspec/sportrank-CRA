import React from 'react'
import { shallow, mount } from 'enzyme';
import EnterResult from "../EnterResult";

xit('EnterResult - invokes `componentDidMount` when shallow mounted', () => {
  jest.spyOn(EnterResult.prototype, 'componentDidMount');
  shallow(<EnterResult />);
  expect(EnterResult.prototype.componentDidMount).toHaveBeenCalled();
  EnterResult.prototype.componentDidMount.mockRestore();
});

xit('EnterResult - not invoke `_getValidationState` when shallow mounted', () => {
  jest.spyOn(EnterResult.prototype, '_getValidationState');
  shallow(<EnterResult />);
  expect(EnterResult.prototype._getValidationState).not.toHaveBeenCalled();
  EnterResult.prototype._getValidationState.mockRestore();
});

xit('EnterResult - not invoke `setResult` when shallow mounted', () => {
  jest.spyOn(EnterResult.prototype, 'setResult');
  shallow(<EnterResult />);
  expect(EnterResult.prototype.setResult).not.toHaveBeenCalled();
  EnterResult.prototype.setResult.mockRestore();
});

fit('EnterResult - not invoke `_handleClick` when shallow mounted', () => {
  const mockedhandleclickFunction = jest.fn(event => {
  console.log("Mocked function");
});
  jest.spyOn(EnterResult.prototype, '_handleClick');
  //const component = shallow(<EnterResult onClick={mockedhandleclickFunction}/>);
  //component.find(EnterResult).instance().onClick = mockedhandleclickFunction;
  //expect(wrapper.find(SignUpForm).state('errors')).to.equal({});
  expect(EnterResult.prototype._handleClick).not.toHaveBeenCalled();
  EnterResult.prototype._handleClick.mockRestore();
});
