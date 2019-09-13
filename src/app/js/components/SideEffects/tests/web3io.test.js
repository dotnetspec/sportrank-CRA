import {
  _loadCurrentUserAccountsInsideMapping,
  _loadExternalBalance,
  getCurrentUserAccountsFromBlockchain,
  _mapCurrentUserAccounts,
  getDefaultUserAccountFromAddress,
  fillArrayIfNoUser,
  mapTheAccounts
} from '../io/web3io';
import web3 from '../../../../../web3';
import 'jest-dom/extend-expect'
import {
  wait
} from '@testing-library/react'
import  *  as web3defaultAccount from '../io/web3defaultAccount';
import  *  as getWeb3Accounts from '../io/web3Accounts';

//REVIEW: there is no point testing simply getting the accounts array
//from the BC. Testing starts with the substantial functionality
//in _mapCurrentUserAccounts

//async testing proving difficult - need to start simple

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

//Rinkeby:
//const address = '0x847700B781667abdD98E1393420754E503dca5b7';
//ganache-noisy-mother account 0 - named testUser1 in MM
const addressNM0 = '0x48DF2ee04DFE67902B83a670281232867e5dC0Ca';
//ganache-noisy-mother account 7
const address = '0x18237903Ec722aF500Ad944A9209aF5fc4136279';

describe('Talking to blockchain via web3io.js', () => {

//below doesn't test anything
  xit('web3.eth.getAccounts', async () => {
    //await web3.eth.getAccounts caused the problem with this test
    new Promise(function(resolve, reject) {
      resolve(web3.eth.getAccounts())
    .then(function(accountsArray) {
      console.log('accountsArray', accountsArray)
      mapTheAccounts(accountsArray);
  })
  .then(function(array) {
    //ganache-noisy-mother test
    console.log('array[7}]', array)
    expect(array[7].address).toEqual(address);
    expect(array[7].user.username).toEqual("testuser");
    expect(array[7].bal).toBeCloseTo(2.0);

    });
  });
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

  describe('web3io.js helper functions',  () => {
    //REVIEW: not sure how to obtain from tests - in browser is ok
    it('fill array in web3io', () => {

      const nouserArr = [
      "0xc353f1FDBfEe3a548472620b8b3c0B022E0D6E07",
      "0xcAEF848222Bce7754B0836d01e4dC027671A5BE2",
      "0x6b07a8ABeb20E5282c3BB918924726E04Bf551aC",
      "0x5d5e5D5E85EF705379787fCb8Bb72E8337E9e28B",
      "0xA8a2d76D0ba8a56217e772620DBe9f1c69719d75",
      "0x675da293f9dc4A1ee111a7893CA73457cC3161C1",
      "0x35115E86c6AF889cE2b2cabC3ee076DF5134e061",
      "0x84b93d1bb390434F6d86884805f032abE6CC5F2E",
      "0xF4DA81504c6c398BEAF11187a41D1E7A2A409b8f",
      "0xb7523d52E859C1910770D9da5C39e9DDCB67483F"];

    //   const filledArrayForTest =
    //   [
    //   {address: "0xc353f1FDBfEe3a548472620b8b3c0B022E0D6E07", user: 'CreateUser', balance: 0},
    //   {address: "0xcAEF848222Bce7754B0836d01e4dC027671A5BE2", user: 'CreateUser', balance: 0},
    //   {address: "0x6b07a8ABeb20E5282c3BB918924726E04Bf551aC", user: 'CreateUser', balance: 0},
    //   {address: "0x5d5e5D5E85EF705379787fCb8Bb72E8337E9e28B", user: 'CreateUser', balance: 0},
    //   {address: "0xA8a2d76D0ba8a56217e772620DBe9f1c69719d75", user: 'CreateUser', balance: 0},
    //   {address: "0x675da293f9dc4A1ee111a7893CA73457cC3161C1", user: 'CreateUser', balance: 0},
    //   {address: "0x35115E86c6AF889cE2b2cabC3ee076DF5134e061", user: 'CreateUser', balance: 0},
    //   {address: "0x84b93d1bb390434F6d86884805f032abE6CC5F2E", user: 'CreateUser', balance: 0},
    //   {address: "0xF4DA81504c6c398BEAF11187a41D1E7A2A409b8f", user: 'CreateUser', balance: 0},
    //   {address: "0xb7523d52E859C1910770D9da5C39e9DDCB67483F", user: 'CreateUser', balance: 0}
    // ];

      const filledArray = fillArrayIfNoUser(nouserArr);
      expect(filledArray[0].user.username).toEqual("CreateUser");
      expect(filledArray[3].address).toEqual("0x5d5e5D5E85EF705379787fCb8Bb72E8337E9e28B");
      expect(filledArray[6].user).not.toEqual("");
      expect(filledArray[6].balance).toEqual(0);

      //const getCurrentUserAccountsFromBlockchain = jest.fn(userAccountsArray);
      // async function getAccounts_callback(array) {
      //   console.log('data', array);
      //   await expect(array[0]).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
      //   done();
    })
      // await wait(() => getCurrentUserAccountsFromBlockchain(getAccounts_callback));
});


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

xit('test getWeb3defaultAccount', async () => {
   //;  // Success!
   //
   //await wait(() => getDefaultUserAccountFromAddress(userAccountsArray, getDefaultUserAccountFromAddress_callback));
   await wait(() => expect(web3defaultAccount.getWeb3defaultAccount()).toBe(addressNM0));


 });

//it('test funcA', () => {
  xit('getDefaultUserAccountFromAddress', () => {
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
