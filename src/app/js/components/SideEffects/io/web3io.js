import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
import { formatEth
//  , executingAt
} from '../../../utils';
//import JSONops from '../../Logic/JSONops'
import { map } from 'async';
//import changeState from '../../SideEffects/StateManager';
//import * as helper from './web3io';
//import { getWeb3defaultAccount } from './web3defaultAccount';
import ChangeState from '../../Logic/ChangeState'
import { getWeb3Accounts } from './web3Accounts';

    //REVIEW: below based on
    //https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
    //to a (small) degree - anyway it's a useful reference
        export async function _loadExternalBalance(_loadExternalBalance_callback){
        //try/catch was interferring with the test!
          await web3.eth.getBalance("0xAC5491BB066c98fec13046928a78761c0B1E5603")
          .then(devAccountBalResult => {
            devAccountBalResult = web3.utils.fromWei(devAccountBalResult, 'ether');
            devAccountBalResult =  formatEth(devAccountBalResult, 3);
            _loadExternalBalance_callback(devAccountBalResult);
          })
      }

      // export async function getCurrentUserAccountsFromBlockchain(){
      //   const userAccountsArray = await web3.eth.getAccounts();
      //     console.log('got accounts after await', userAccountsArray[0])
      //   return userAccountsArray;
      // }

// export async function isWeb3Connected(){
//   console.log('here')
//     web3.eth.net.isListening()
//       .then(() => console.log('is connected'))
//       .catch(e => console.log('Wow. Something went wrong'));
//       return 'in here'
//     }

// export async function connectToWeb3new(connectToWeb3_callback){
//     console.log('typeof web3.ethereum', typeof web3.ethereum)
//   let ethereumObj = {};
//     if (typeof web3.ethereum !== 'undefined') {
//       //console.log('you have an etherem compatible browser')
//       if(web3.ethereum.isMetaMask){
//         console.log('you have MM in the browser', web3.ethereum)
//         console.log('web3', web3 )
//         ethereumObj = {networkVersion:  window.ethereum.networkVersion,   // property_# may be an identifier...
//                             selectedAddress:  window.ethereum.selectedAddress}
//
//         // console.log('ethereum.selectedAddress', )
//         await connectToWeb3_callback(ethereumObj);
//         //window.ethereum.enable();
//         }
//     };
//   }



  /**
   * Loads user details from the contract for all accounts on the node.
   *
   * For each account on the node, first, the owners mapping is queried using the
   * owner address key. It returns the hash of the username it maps to. This
   * username hash is then used to query the users mapping in the contract to
   * get the details of the user. Once the user details are returned, the state
   * is updated with the details, which triggers a render in this component and
   * all child components.
   * _loadCurrentUserAccounts is triggered by onAfterUserUpdate in e.g. createuser.js
   * because it is sent as a property to these components
   *
   * @returns {null}
   */
  export async function _mapCurrentUserAccounts(){
        new Promise(function(resolve, reject) {
            resolve(web3.eth.getAccounts());
          }).then(function(result) { // (**)
            console.log(result); // 1
            const newArray = mapTheAccounts(result);
            // let state = {};
            // state = ChangeState.assignUserAcctStateToStateObj(state, newArray, newArray[0]);
            return newArray;
          }).then(function(result) { // (***)
            console.log('result after state assigned', result); // 2
            return result;
          })
          // .then(function(result) {
          //   //console.log(result); // 4
          //   return result;
          // });
    }
    // end of _loadCurrentUserAccounts

      //export const mapTheAccounts =  async (accountsArray)  => {
    export const mapTheAccounts = async (accountsArray) => {
        // await web3.eth.getAccounts().then((accountsArray) => {
        console.log('accountsArray in mapTheAccounts', accountsArray)
        //const accountsArray = await web3.eth.getAccounts();
        const newArray = accountsArray.map(processArray);
        console.log('newArray', newArray)
        return newArray;

        function processArray(){
          //const addressArray = '0x48DF2ee04DFE67902B83a670281232867e5dC0Ca'
          // const address = accountsArray;
          // const usernameHash = await DSportRank.methods.owners(address).call();
          // const user = await DSportRank.methods.users(usernameHash).call();
          const address = '0x48DF2ee04DFE67902B83a670281232867e5dC0Ca';
          const username = 'testuser1';
          const bal = 2.0;
          const userAccountOjb =
                  { userAccount: {
                        address: address,
                        balance: bal,
                        user: {
                           username: username,
                           description: "test2",
                           email: "test@test.com",
                           owner: "0x48DF2ee04DFE67902B83a670281232867e5dC0Ca",
                           picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
                           rankingDefault: "5c81c1e944e81057efe3e2c8"
                        }
                      }
                    }
          return userAccountOjb;
        }
      }
    //)
      //return accountsArray;
  //}


  //     map(accountsArray,
  //       async function (address, next) {
  //           try {
  //               console.log('address inside await map', address)
  //               const usernameHash = await DSportRank.methods.owners(address).call();
  //               const user = await DSportRank.methods.users(usernameHash).call();
  //               let balance = await web3.eth.getBalance(address);
  //               balance = web3.utils.fromWei(balance, 'ether');
  //               next(null, {
  //                 address: address,
  //                 user: user,
  //                 balance: balance
  //               }
  //             );
  //           }
  //           catch (err) {
  //             console.log("Error current item index in _mapCurrentUserAccounts", err);
  //             next(err);
  //           }
  //         }
  //     , (err, userAccounts) => {
  //       if(userAccounts.length < 1){
  //         userAccounts = fillArrayIfNoUser(accountsArray);
  //         console.log('userAccounts array in if', userAccounts)
  //       }
  //       console.log('userAccounts array', userAccounts)
  //       let defaultUserAccount = [];
  //        console.log('defaultUserAccount', defaultUserAccount)
  //        defaultUserAccount = userAccounts[0];
  //       //let state = {};
  //       //state = ChangeState.assignUserAcctStateToStateObj(state, userAccounts, defaultUserAccount);
  //       //  console.log('state', state);
  //         console.log('userAccounts', userAccounts)
  //         return userAccounts;
  //     }
  //   );
  //   }
  //
  //   )
  //   //return accountsArray;
  // }

    export const fillArrayIfNoUser = (arrayToFill) => {
      //var fullname = []
      function addUserAndBalToAccountsArray(item){
        const userObj =     { username: 'CreateUser',
                             description: 'holder descr',
                             contactno: '1234321',
                             email: 'test@test.com',
                             owner: '0x847700B781667abdD98E1393420754E503dca5b7',
                             picture: 'Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL',
                             rankingDefault: '5c81c1e944e81057efe3e2c8' };
        const accountObjItem = {address:item, user: userObj, balance: 0.0};
        return accountObjItem;
      }
      var arrOfObjs = arrayToFill.map(addUserAndBalToAccountsArray);
      return arrOfObjs;
    }

    //pull one account out of the the userAccounts array that matches
    //the current connected accountsArray
  //  export function getDefaultUserAccountFromAddress(userAccounts){
  //I think this is used for when user changes account
  export const getDefaultUserAccountFromAddress = (userAccountsArray, accountsArray) => {
    //export async function getDefaultUserAccountFromAddress(userAccountsArray){
    //console.log('userAccountsArray in getDefaultUserAccountFromAddress', userAccountsArray)
    //console.log('accountsArray in getDefaultUserAccountFromAddress', accountsArray)
    //in the array of userAccounts find a particular matching
    //specificUserAccount address
    //all that's needed for the particular array element to be returned
    //is for this function to return true
    function checkAddresses(specificAccount) {
      //console.log('typeof acctNo', typeof acctNo)
      //console.log('specificAccount.address', specificAccount.address);
      //const arrRes = getWeb3defaultAccount();
      //const arrResFormat = '[' + arrRes + ']';
      //console.log('defaultAccount', defaultAccount);
      return specificAccount.address === accountsArray;
      //return specificAccount.address === arrResFormat;
    }
      //return whatever type is found that matches the search criteria
      //return acctNos.find(checkAddresses);
      const specificAddress =  userAccountsArray.find(checkAddresses);
      //console.log('specific address', specificAddress)
      return specificAddress;
      // userAccounts.find((specificUserAccount) => {
      //   console.log('address of particular element in the array', specificUserAccount.address);
      //   console.log('the address in the whole array of userAccounts', userAccounts[0].address);
      //   //return userAccount.address === web3.eth.defaultAccount;
      //   //return userAccount.address === helper.getWeb3defaultAccount();
      //   //if the current address matches the one in the particular
      //   //array element return it :
      //   //return specificUserAccount.address === getWeb3defaultAccount();
      //   return specificUserAccount.address === '0x847700B781667abdD98E1393420754E503dca5b7;'
      //   //return userAccount.address === web3.eth.getAccounts(accounts => console.log(accounts[0]));
      // });
    }

export async function connectToWeb3(){
    window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        //window.web3 = new Web3(ethereum);
        window.web3 = web3;
        try {
            // Request account access if needed
            await web3.enable();
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
            return web3;
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = web3;
        //window.web3 = await web3.enable();
        //new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
        return web3;
    }
    // Non-dapp browsers...
    else {
        return 'Non-Ethereum browser detected. You should consider trying MetaMask!';
        //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});
}

//NB: this function cannot actually be used in app.js as it's only simulating the one
//nested inside the mapping function of _loadCurrentUserAccounts
//helped to understand how the mapping works
  export async function _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback){

      const usernameHash = await DSportRank.methods.owners(address).call();
          // get user details from contract
      const user = await DSportRank.methods.users(usernameHash).call();
      // gets the balance of the address
      let balance = await web3.eth.getBalance(address);
      balance = web3.utils.fromWei(balance, 'ether');
      const contractObj = {address: address, user: user, balance: balance};
      _loadCurrentUserAccountsInsideMapping_callback(contractObj);
    }
