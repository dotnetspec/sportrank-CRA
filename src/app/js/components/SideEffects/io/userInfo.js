// import Header from '../UI/Header'
// import Main from './Main'
import React, {
  useState,
  useEffect
} from 'react';
// import {
//   withRouter
// } from 'react-router-dom';
//import JSONops from './JSONops';
// import {
//   _loadsetJSONData,
//   getNewRankId,
//   getDefaultRankingList
// } from '../SideEffects/io/Jsonio';
// import {
//   _loadExternalBalance
//   //,
//   // _mapCurrentUserAccounts,
//   // mapTheAccounts
// } from '../SideEffects/io/web3io';
//import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
// import ChangeState from './ChangeState';
// import {formatEth} from '../../utils';


//useEffect(() => {
  //async function fetchUserData() {
    //based on: https://flaviocopes.com/javascript-async-await-array-map/
    //get the hashes by async
    //each separate piece of async data needs these parts ...

    export const fetchUserData = async (ownerAddress) => {
      DSportRank.methods.owners(ownerAddress).call()
        .then(async function(hash) {
          //use the hashes to get the user data from contract by async
          const functionGetUserDataWithPromise = item => { //a function that returns a promise
            return Promise.resolve(DSportRank.methods.users(item).call());
          }
          const anAsyncFunctionToGetUserData = async item => {
            return await functionGetUserDataWithPromise(item)
          }
          const getUserData = async () => {
            return await anAsyncFunctionToGetUserData(hash)
          }
          return await getUserData();
        })
    }
    //fetchUserData();
  //}, []); // Or [someId] (sent as a param to a function) if effect needs props or state (apparently)


//});
