import {
challengeSendToContract
} from '../io/challengeSendToContract';
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
import { getDefaultUserAccountFromAddress } from '../io/web3io';
import  *  as web3defaultAccount from '../io/web3defaultAccount';
import  *  as getWeb3Accounts from '../io/web3Accounts';
//import *  as challengeSendToContract from '../io/challengeSendToContract';

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
//This was just randomly picked from Etherscan:
const transactionHash = '0x3b208e2e7198d67705d90c3067902096c9f9297ad5f2e78195b6852d72090cbe'

describe('SideEffects/io/', () => {
  xit('challengeSendToContract - mock check', () => {
    //the first param is the file, the second the function within the file:
    //we're just mocking and returning the mocked result to learn input/outputs
    //but it'll then be ready for mocking elsewhere
    const spy = jest.spyOn(challengeSendToContract, 'challengeSendToContract');
    spy.mockReturnValue(transactionHash);

    //const obj = getDefaultUserAccountFromAddress(userAccountsArray);
    //let obj = [];
    //challengeSendToContract(gasEstimate, challengeState){
    const txhashreturned = challengeSendToContract(53000, 'player1 vs player3');
    //console.log('type of objArr', typeof objArr)
    //const obj = userAccountsArray[0];
    //console.log('userAccountsArray', userAccountsArray[0].address)
    //expect(obj.).toBe('mocked');  // Success!
    //expect(objArr.address).toEqual(address);
    expect(txhashreturned).toEqual(transactionHash);
    // let bal = parseFloat(obj[0].balance);
    // expect(bal).toBeDefined();
    // expect(bal).toBeGreaterThanOrEqual(0.0);
    // expect(obj[0].user.username).toEqual("player1");
    spy.mockRestore();
  });
});


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
