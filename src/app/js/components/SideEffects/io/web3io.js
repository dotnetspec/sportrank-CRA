import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
import { formatEth
} from '../../../utils';


    //REVIEW: below based on
    //https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
    //to a (small) degree - anyway it's a useful reference
        export async function _loadExternalBalance(_loadExternalBalance_callback){
        //try/catch was interferring with the test!
          await web3.eth.getBalance("0xAC5491BB066c98fec13046928a78761c0B1E5603")
          .then(devAccountBalResult => {
            devAccountBalResult = web3.utils.fromWei(devAccountBalResult, 'ether');
            devAccountBalResult =  formatEth(devAccountBalResult, 3);
            //return devAccountBalResult;
            _loadExternalBalance_callback(devAccountBalResult);
          })
      }
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
  // export async function _mapCurrentUserAccounts(){
  //       new Promise(function(resolve, reject) {
  //           resolve(web3.eth.getAccounts());
  //         }).then(function(result) { // (**)
  //           console.log(result); // 1
  //           const newArray = mapTheAccounts(result);
  //           // state = ChangeState.assignUserAcctStateToStateObj(state, newArray, newArray[0]);
  //           return newArray;
  //         }).then(function(result) { // (***)
  //           console.log('result after state assigned', result); // 2
  //           return result;
  //         })
  //         // .then(function(result) {
  //         //   //console.log(result); // 4
  //         //   return result;
  //         // });
  //   }
    // end of _loadCurrentUserAccounts





          //const username = 'testuser1';
          // const bal = 2.0;
          // const userAccountOjb =
          //         {
          //               address: address,
          //               balance: bal,
          //               user: {
          //                  username: username,
          //                  description: "test2",
          //                  email: "test@test.com",
          //                  owner: "0x48DF2ee04DFE67902B83a670281232867e5dC0Ca",
          //                  picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          //                  rankingDefault: "5c81c1e944e81057efe3e2c8"
          //               }
          //         }
          //
          // return userAccountOjb;
      //   }
      // }

    export const fillArrayIfNoUser = (arrayToFill) => {
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
