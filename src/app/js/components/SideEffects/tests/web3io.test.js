import { isWeb3Connected, connectToWeb3new, _loadCurrentUserAccountsInsideMapping, _loadExternalBalance } from '../io/web3io';
import web3 from '../../../../../web3';
//if testing a component use enzyme:
//import { shallow, mount, render } from 'enzyme';
//const wrapper = shallow(<Foo />);
//
// const on = jest.fn()
// global.web3 = {
//   web3
// }

//this test possibly needs jsdom
describe('isWeb3Connected, connectToWeb3', () => {
  it.skip('isWeb3Connected, connectToWeb3 should connect', (done) => {

  //expect(isWeb3Connected).toBeTruthy();
  //expect(connectToWeb3.eth.defaultAccount()).toMatch(/0x847700B781667abdD98E1393420754E503dca5b7/);

  function connectToWeb3_callback(obj) {
    console.log('web3', obj);
     expect(obj.networkVersion).toEqual(4);
     expect(obj.selectedAddress).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
     done();
   }
  connectToWeb3new(connectToWeb3_callback);
  });
});

describe('_loadCurrentUserAccounts in app.js should get account data', () => {
  it('_loadCurrentUserAccountsInsideMapping', done => {
    //const rankingDefaultid = '5c36f5422c87fa27306acb52';
    //const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
    const address = "0x847700B781667abdD98E1393420754E503dca5b7";
    function _loadCurrentUserAccountsInsideMapping_callback(obj) {
      console.log('data', obj);
       expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
       //REVIEW: balance will change so need a better test here
       //expect(obj.balance).toEqual(23.746269267999999996);
       expect(obj.user.username).toEqual("player1");
       //expect(data.id).toMatch('5c36f5422c87fa27306acb52');
       //done() is the cb(?) function in the declaration (above)
       done();
     }
     //this function mimicks asnyc function in the .map in _loadCurrentUserAccounts()
     _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback);
   });
 });

 describe('_loadExternalBalance in web3io.js should get account balance', () => {
   it('_loadExternalBalance', done => {
     //const rankingDefaultid = '5c36f5422c87fa27306acb52';
     //const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
     //const address = "0x847700B781667abdD98E1393420754E503dca5b7";
     function _loadExternalBalance_callback(bal) {
       console.log('bal', bal);
        //expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
        //REVIEW: balance will change so need a better test here
        //expect(obj.balance).toEqual(23.746269267999999996);

        expect(bal).toBeDefined();
        expect(bal).toBeGreaterThan(0);
        //expect(data.id).toMatch('5c36f5422c87fa27306acb52');
        //done() is the cb(?) function in the declaration (above)
        done();
      }
      _loadExternalBalance(_loadExternalBalance_callback);
    });
  });
