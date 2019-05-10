import { isWeb3Connected, connectToWeb3 } from '../io/web3io';
//import web3 from '../../../../../web3';
//if testing a component use enzyme:
//import { shallow, mount, render } from 'enzyme';
//const wrapper = shallow(<Foo />);
//
// const on = jest.fn()
// global.web3 = {
//   web3
// }


it('isWeb3Connected, connectToWeb3', () => {

  expect(isWeb3Connected).toBeTruthy();
  //expect(connectToWeb3).toMatch(/Non-Ethereum browser detected. You should consider trying MetaMask!/);

});
