import {
  isWeb3Connected,
  connectToWeb3new,
  _loadCurrentUserAccountsInsideMapping,
  _loadExternalBalance,
  getCurrentUserAccountsFromBlockchain,
  _mapCurrentUserAccounts,
  getDefaultUserAccountFromAddress
  //,
  //getDefaultUserAccountFromAddress,
  //getWeb3defaultAccount
} from '../io/web3io';
import web3 from '../../../../../web3';
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import Web3 from 'web3';
import PrivateKeyProvider from 'truffle-privatekey-provider'
import  *  as web3defaultAccount from '../io/web3defaultAccount';
import  *  as getWeb3Accounts from '../io/web3Accounts';

//REVIEW: there is no point testing simply getting the accounts array
//from the BC. Testing starts with the substantial functionality
//in _mapCurrentUserAccounts

//jest.mock('../SideEffects/io/web3io');
// const fakegetCurrentUserAccountsFromBlockchain = jest.fn('../SideEffects/io/web3io/getCurrentUserAccountsFromBlockchain');
// fakegetCurrentUserAccountsFromBlockchain.mockReturnValue(['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999']);

//NB: only _loadExternalBalance test currently being applied: implementation tests?

const userAccountsArray = [{
  address: '0x847700B781667abdD98E1393420754E503dca5b7',
  balance: 2.0,
  user: {
    username: 'player1',
    description: "test2",
    email: "test@test.com",
    owner: "0x847700B781667abdD98E1393420754E503dca5b7",
    picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
    rankingDefault: "5c81c1e944e81057efe3e2c8"
  }
}];

const address = '0x847700B781667abdD98E1393420754E503dca5b7';



 // async function connectToWeb3TestProvider(connectToWeb3_callback){
 //    //console.log('connectToWeb3new')
 //    const provider = new PrivateKeyProvider(
 //    '3CAD6A07AEE2FC7439F09DD600E42A3D2CC8A2D8F6FEA4015E19C759AC3DA2C9',
 //    'https://rinkeby.infura.io/',
 //    );
 //    const web3 = new Web3(provider || 'wss://rinkeby.infura.io/ws' || 'ws://localhost:8546', null, {});
 //
 //    console.log('provider', provider)
 //  let ethereumObj = {};
 //    if (typeof web3.ethereum !== 'undefined') {
 //      console.log('you have an etherem compatible browser')
 //      if(web3.ethereum.isMetaMask){
 //        console.log('you have MM in the browser')
 //        ethereumObj = {networkVersion:  window.ethereum.networkVersion,   // property_# may be an identifier...
 //                            selectedAddress:  window.ethereum.selectedAddress}
 //        // console.log('ethereum.networkVersion',  )
 //        // console.log('ethereum.selectedAddress', )
 //        await connectToWeb3_callback(ethereumObj);
 //        //window.ethereum.enable();
 //        }
 //    };
 //  }


describe('Talking to blockchain via web3io.js', () => {
  //REVIEW: not sure how to obtain from tests - in browser is ok
  xit('web3.eth.getAccounts', async done => {
    //const getCurrentUserAccountsFromBlockchain = jest.fn(userAccountsArray);
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
      await expect(getCurrentUserAccountsFromBlockchain()).toHaveBeenCalled();
      await expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
      let bal = parseFloat(obj.balance);
      await expect(bal).toBeDefined();
      await expect(bal).toBeGreaterThanOrEqual(0.0);
      await expect(obj.user.username).toEqual("player1");
      done();
    }
    //this function mimicks asnyc function in the .map in _loadCurrentUserAccounts()
    //userAccountsArray is obtained from getCurrentUserAccountsFromBlockchain
    //await wait(() => _mapCurrentUserAccounts(fakegetCurrentUserAccountsFromBlockchain, _mapCurrentUserAccounts_callback));
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
//describe('isWeb3Connected, connectToWeb3', () => {


  //make the test async
//   it('isWeb3Connected, connectToWeb3 should connect', async (done) => {
//     function connectToWeb3_callback(obj) {
//       //console.log('web3', obj);
//       expect(obj.networkVersion).toEqual(4);
//       expect(obj.selectedAddress).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
//       done();
//     }
//     await connectToWeb3TestProvider(connectToWeb3_callback);
//   });
// });



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

// let defaultUserAccount = userAccounts.find((userAccount) => {
//     198 |             //console.log('about to return default userAccount.address', web3.eth.defaultAccount);
//   > 199 |             return userAccount.address === web3.eth.defaultAccount;
//         |                                ^
//     200 |             //return userAccount.address === web3.eth.getAccounts(accounts => console.log(accounts[0]));
//     201 |           });

xit('test getWeb3defaultAccount', () => {
   expect(web3defaultAccount.getWeb3defaultAccount()).toBe('undefined');  // Success!
 });

//it('test funcA', () => {
  it('getDefaultUserAccountFromAddress', () => {
    const spy = jest.spyOn(web3defaultAccount, 'getWeb3defaultAccount');
    spy.mockReturnValue(address);

    //const obj = getDefaultUserAccountFromAddress(userAccountsArray);
    let obj = [];
    //REVEIW: this isn't using a call to web3defaultAccount
    obj[0] = getDefaultUserAccountFromAddress(userAccountsArray, address);
    //console.log('type of objArr', typeof objArr)
    //const obj = userAccountsArray[0];
    //console.log('userAccountsArray', userAccountsArray[0].address)
    //expect(obj.).toBe('mocked');  // Success!
    //expect(objArr.address).toEqual(address);
    expect(obj[0].address).toEqual(address);
    let bal = parseFloat(obj[0].balance);
    expect(bal).toBeDefined();
    expect(bal).toBeGreaterThanOrEqual(0.0);
    expect(obj[0].user.username).toEqual("player1");
    spy.mockRestore();
  });

//});


describe('web3io.js', () => {
  xit('getDefaultUserAccountFromAddress', done => {
    //const rankingDefaultid = '5c36f5422c87fa27306acb52';
    //const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
    const address = "0x847700B781667abdD98E1393420754E503dca5b7";
    // async function getDefaultUserAccountFromAddress_callback(obj) {
    //   //console.log('data', obj);
    //   await expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
    //   let bal = parseFloat(obj.balance);
    //   await expect(bal).toBeDefined();
    //   await expect(bal).toBeGreaterThanOrEqual(0.0);
    //   await expect(obj.user.username).toEqual("player1");
    //   done();
    // }
    //this function mimicks asnyc function in the .map in _loadCurrentUserAccounts()
    //await wait(() => getDefaultUserAccountFromAddress(userAccountsArray, getDefaultUserAccountFromAddress_callback));
//     const mockCallback = jest.fn(address);
// getWeb3defaultAccount(mockCallback);

// The mock function is called
//expect(mockCallback.mock.calls.length).toBe(1);
//jest.mock('../../SideEffects/io/web3io');
//getWeb3defaultAccount.mockImplementation(address);

const mockgetWeb3Accounts = jest.fn(address);
//getDefaultUserAccountFromAddress(userAccountsArray, getWeb3defaultAccount);
// The mock function is called twice


    getWeb3Accounts(mockgetWeb3Accounts);
    expect(mockgetWeb3Accounts.mock.calls.length).toBe(1);

    // expect(obj.address).toEqual(address);
    // let bal = parseFloat(obj.balance);
    // expect(bal).toBeDefined();
    // expect(bal).toBeGreaterThanOrEqual(0.0);
    // expect(obj.user.username).toEqual("player1");
  });
});
