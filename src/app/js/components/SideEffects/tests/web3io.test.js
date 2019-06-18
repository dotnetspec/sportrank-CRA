import { isWeb3Connected, connectToWeb3new, _loadCurrentUserAccountsInsideMapping, _loadExternalBalance } from '../io/web3io';
import web3 from '../../../../../web3';
import 'jest-dom/extend-expect'
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
//if testing a component use enzyme:
//import { shallow, mount, render } from 'enzyme';
//const wrapper = shallow(<Foo />);
//
// const on = jest.fn()
// global.web3 = {
//   web3
// }

cleanup();

//this test possibly needs jsdom
describe('isWeb3Connected, connectToWeb3', () => {
  //make the test async
  it.skip('isWeb3Connected, connectToWeb3 should connect', async (done) => {

  //expect(isWeb3Connected).toBeTruthy();
  //expect(connectToWeb3.eth.defaultAccount()).toMatch(/0x847700B781667abdD98E1393420754E503dca5b7/);

  function connectToWeb3_callback(obj) {
    //console.log('web3', obj);
      expect(obj.networkVersion).toEqual(4);
      expect(obj.selectedAddress).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
     done();
   }
   connectToWeb3new(connectToWeb3_callback);
  });
});

describe('_loadCurrentUserAccounts in app.js should get account data', () => {
  it('_loadCurrentUserAccountsInsideMapping', async done => {
    //const rankingDefaultid = '5c36f5422c87fa27306acb52';
    //const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
    const address = "0x847700B781667abdD98E1393420754E503dca5b7";
    async function _loadCurrentUserAccountsInsideMapping_callback(obj) {
       //console.log('data', obj);
       await expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
       let bal = parseFloat(obj.balance);
       await expect(bal).toBeDefined();
       await expect(bal).toBeGreaterThanOrEqual(0.0);
       await expect(obj.user.username).toEqual("player1");
       done();
     }
     //this function mimicks asnyc function in the .map in _loadCurrentUserAccounts()
    await wait(() => _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback));

   });
 });

 describe('_loadExternalBalance in web3io.js should get account balance', () => {
   it('_loadExternalBalance', async done => {
     async function _loadExternalBalance_callback(bal) {
        bal = parseFloat(bal);
        await expect(bal).toBeDefined();
        await expect(bal).toBeGreaterThan(0);
        done();
      }
       await wait(() => _loadExternalBalance(_loadExternalBalance_callback));
    });
  });
