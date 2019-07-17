import { isWeb3Connected, connectToWeb3new,
  _loadCurrentUserAccountsInsideMapping, _loadExternalBalance,
  getCurrentUserAccountsFromBlockchain, _mapCurrentUserAccounts } from '../io/web3io';
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

//NB: only _loadExternalBalance test currently being applied: implementation tests?

const userAccountsArray =
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


describe('Talking to blockchain via web3io.js', () => {
  //REVIEW: not sure how to obtain from tests - in browser is ok
  xit('LIVE - web3.eth.getAccounts', async done => {
    async function getAccounts_callback(array) {
       console.log('data', array);
       await expect(array[0]).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
       done();
     }
    await wait(() => getCurrentUserAccountsFromBlockchain(getAccounts_callback));
   });

  xit('_mapCurrentUserAccounts - complete ', async done => {
    //const rankingDefaultid = '5c36f5422c87fa27306acb52';
    const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
    //const address = "0x847700B781667abdD98E1393420754E503dca5b7";
    async function _mapCurrentUserAccounts_callback(obj) {
       //console.log('data', obj);
       await expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
       let bal = parseFloat(obj.balance);
       await expect(bal).toBeDefined();
       await expect(bal).toBeGreaterThanOrEqual(0.0);
       await expect(obj.user.username).toEqual("player1");
       done();
     }
     //this function mimicks asnyc function in the .map in _loadCurrentUserAccounts()
     //userAccountsArray is obtained from getCurrentUserAccountsFromBlockchain
    await wait(() => _mapCurrentUserAccounts(address, _mapCurrentUserAccounts_callback));
   });
 });


describe('_loadExternalBalance in web3io.js should get account balance', () => {
  xit('_loadExternalBalance', async () => {
    async function _loadExternalBalance_callback(bal) {
       bal = parseFloat(bal);
       await expect(bal).toBeDefined();
       await expect(bal).toBeGreaterThan(0);
       //done();
     }
      await wait(() => _loadExternalBalance(_loadExternalBalance_callback));
   });
 });

//this test possibly needs jsdom
describe('isWeb3Connected, connectToWeb3', () => {


  //make the test async
  it.skip('isWeb3Connected, connectToWeb3 should connect', async (done) => {
  function connectToWeb3_callback(obj) {
    //console.log('web3', obj);
      expect(obj.networkVersion).toEqual(4);
      expect(obj.selectedAddress).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
     done();
   }
   connectToWeb3new(connectToWeb3_callback);
  });
});



describe('_loadCurrentUserAccounts in app.js inside mapping should get account data', () => {
  xit('_loadCurrentUserAccountsInsideMapping', async done => {
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
