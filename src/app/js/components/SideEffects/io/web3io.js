import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
import { formatEth, executingAt } from '../../../utils';
import JSONops from '../../Logic/JSONops'
import { map } from 'async';

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

    //REVIEW: below based on
    //https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
    //to a (small) degree - anyway it's a useful reference
        //export async function _loadExternalBalance(_loadExternalBalance_callback){
      export async function _loadExternalBalance(){
        //try/catch was interferring with the test!
          let devAccountBalResult = await web3.eth.getBalance("0xd496e890fcaa0b8453abb17c061003acb3bcc28e");
          devAccountBalResult = web3.utils.fromWei(devAccountBalResult, 'ether');
          devAccountBalResult =  formatEth(devAccountBalResult, 3);
          //_loadExternalBalance_callback(devAccountBalResult);
          return devAccountBalResult;
      }

// export async function isWeb3Connected(){
//   console.log('here')
//     web3.eth.net.isListening()
//       .then(() => console.log('is connected'))
//       .catch(e => console.log('Wow. Something went wrong'));
//       return 'in here'
//     }

export async function connectToWeb3new(connectToWeb3_callback){
    //console.log('connectToWeb3new')
  let ethereumObj = {};
    if (typeof web3.ethereum !== 'undefined') {
      //console.log('you have an etherem compatible browser')
      if(web3.ethereum.isMetaMask){
        //console.log('you have MM in the browser')
        ethereumObj = {networkVersion:  window.ethereum.networkVersion,   // property_# may be an identifier...
                            selectedAddress:  window.ethereum.selectedAddress}
        // console.log('ethereum.networkVersion',  )
        // console.log('ethereum.selectedAddress', )
        await connectToWeb3_callback(ethereumObj);
        //window.ethereum.enable();
        }
    };
  }

  function assignToStateObj(userAccounts, defaultUserAccount, state){

    console.log('defaultUserAccount[0].address', defaultUserAccount[0].address)
    //common setState
    //the most important setState is the first one, which is the point of this
    //
          //this.setState({
            state.userAccounts =  userAccounts;
            state.user =  defaultUserAccount[0].user;
            state.contactno =  defaultUserAccount[0].user.contactno;
            state.email =  defaultUserAccount[0].user.email;
            state.description =  defaultUserAccount[0].user.description;
            //account =  web3.eth.defaultAccount;
            state.account =  defaultUserAccount[0].address;
            state.balance =  defaultUserAccount[0].balance;
            state.contactNoCB =  '';
            state.emailCB =  '';
            state.loadingAccounts =  false;
            //newrankId must be cleared so a new one has to be regenerated for each account
            state.newrankId =  '';
            state.viewingOnlyCB =  true
            return state;
  }

  function handleStateAccordingToUserExists(defaultUserAccount, state){
    if(defaultUserAccount[0].user.username === '' || defaultUserAccount[0].user.username === undefined){
      console.log('handleStateAccordingToUserExists no user')
      state.rankingDefault =  '';
      state.isUserInJson =  false;
      state.isCurrentUserActive = false;
      return state;
    }else{
      console.log('new rankingDefault to be set', defaultUserAccount[0].user.rankingDefault)
      //REVEIW: perhaps change the naming of rankingDefault as it may be confusing
      //now that it is set by the user selection in GlobalRankings not the default value
      // in the contract
      state.newrankId =  defaultUserAccount[0].user.rankingDefault;
      return state;
    }
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

  //export async function _loadCurrentUserAccounts(_loadCurrentUserAccounts_callback){
  export async function _loadCurrentUserAccounts(){
    let state = {};
  //try/catch was interferring with the test!
  //_loadCurrentUserAccounts uses an anonymous async function to assign
  //the accounts array from web3.eth.getAccounts() to the State array 'userAccounts'
  //via each address in the map function  (which does: return userAccount.address)
    //_loadCurrentUserAccounts = async () => {
      //console.log('_loadCurrentUserAccounts')
        // get all the accounts the node controls
        //await EmbarkJS.Blockchain.connect(DSportRank);
        //web3.Blockchain.co
        // console.log('about to do await on getAccounts(), when done - got accounts after await')
        // console.log('exec at', executingAt());
        const accountsFromTheBC = await web3.eth.getAccounts();
          //console.log('got accounts after await', accountsFromTheBC)
          //console.log('exec at', executingAt());

          //console.log('the data', this.state.data);

          //accountsFromTheBC just indicates how many times to iterate. It isn't used
          //otherwise

        // Generates a mapping of users and accounts to be used
        // for populating the accounts dropdown
        // map takes 3 args -
        // current item value (accounts);
        // current item index (async function (address, next))
        // the name of the new array that the mapping will create.
        //not sure if need p-iteration
        //const { map } = require('p-iteration');
        // param 1 - current item value (accounts);
        //accounts should be an array of addresses
        //when using MetaMask we can only currently access one account at a time
        //until an MM update changes this
        await map(accountsFromTheBC,
          //which are being mapped to the relevant addresses:
          //param 2 - current item index
          //map() maps 2 types of indexed item
          //(labelled address and callback (was originally 'next')), which come back as promises,
          //to it's 3rd param userAccounts

          //I think this is designed so that the current item value (accountsFromTheBC)
          //becomes the first param in the async function
          //callback is the (arbitrary) name that can be called within this
          //async function
          //this is an anonymous function (with 2 params) that could be using fat arrow syntax
          //it can have as many params as it likes

          //I believe address (arbitrary name, could be anything)
          //is being iteratively extracted from the accountsFromTheBC
          //array, and then used here to get the user name from the contract
          //via the usernameHash

          //instead of using an anonymous function will used named one from io/Contractio
          //async function _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback){
          async function (address, callback) {
              try {
                // console.log('callback inside await map', callback)
                // console.log('address inside await map', address)
                // // get the owner details for this address from the contract
                // console.log('about to get usernameHash, when done - got usernameHash after await')
                //console.log('exec at', executingAt());
                const usernameHash = await DSportRank.methods.owners(address).call();
                // console.log('exec at', executingAt());
                // get user details from contract
                const user = await DSportRank.methods.users(usernameHash).call();

                // gets the balance of the address
                let balance = await web3.eth.getBalance(address);
                balance = web3.utils.fromWei(balance, 'ether');
                //console.log('balance', balance)
                //REVIEW: stopped execution here after first account loads
                //to prevent Callback already called error
                //return null;
                // update user picture with ipfs url
                //user.picture = user.picture.length > 0 ? EmbarkJS.Storage.getUrl(user.picture) : imgAvatar;
                // add the following mapping to our result
                //console.log('callback1', callback)
                //call the callback function and wait for it's promise
                //(async functions return promises)

                //callback creates obj that is implicitly assigned by the
                //mapping to userAccounts array (or obj?)
                //because the callback is the result of this anon
                //async function
                //in brackets is the data that's come back from the callback function
                //and the data as it comes back
                //from the contract
                //the 'null' might originally have been the first
                //argument of the callback function as the currently iterated
                //value of the array.  that was passed to the cb
                //it went from being a 'this' to a null because it went out of scope

                //if you use the Contractio code the callback will already give you
                //a complete obj. No need to make the assignment here then

                //_loadCurrentUserAccountsInsideMapping_callback(contractObj);

                callback(null, {
                  address: address,
                  user: user,
                  balance: balance
                  //,
                  //NB: added by me:
                  //updatedExtAcctBalCB: globalVardevAccountBalResult
                });
                //console.log('callback2', callback)
              }
              catch (err) {
                //console.log("Error within current item index", err);

                //next(err);
              }//end of try/catch within async function definition within await/map
            }//end of async function definition within await map

            //param 3 - the new name for the array that the mapping will create
            //this moment (when the accounts have been returned) is used to
            //do a whole series of state var assignments in another anonymous
            //function
        , (err, userAccounts) => {
          //err is only relevant in the next line
          if (err) return this._onError(err, 'App._loadCurrentUserAccounts');
          //console.log('user in 3rd param', user)
          //console.log('userAccounts array', userAccounts)
          //console.log('web3.eth.defaultAccount', web3.eth.getAccounts(accounts => console.log(accounts[0])))
          //now all these assignments are done on the userAccounts array
          let defaultUserAccount = userAccounts.find((userAccount) => {
            //console.log('about to return default userAccount.address', web3.eth.defaultAccount);
            return userAccount.address === web3.eth.defaultAccount;
            //return userAccount.address === web3.eth.getAccounts(accounts => console.log(accounts[0]));
          });
          //now all these assignments are done as the values are added,
          //one at a time, to the userAccounts array
          //HACK: I think only works for 1 account
          //I'm forced to specify array index[0] when it wasn't previously required
          defaultUserAccount = userAccounts;

          //check that there is an existing default account user
          //before setting state. if there isn't app will go to create
          state = handleStateAccordingToUserExists(defaultUserAccount, state)

            console.log('userAccounts', userAccounts)
            //NB: further state management may be required
            //as earlier state settings may be affected
            state = assignToStateObj(userAccounts, defaultUserAccount, state);

        }//end of the functionality that has (mysteriously) been added into
        //what should have been simply passing an array into a map function
        //however, much critical assignment is done in this stage

      );////end of whole of await map including error Checking
      //I think a .then() could be added at the end of the await[?]
        console.log('end of loadingAccounts', state)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//the async call to _loadCurrentUserAccounts is made in app.js
//the associated promise is resolved here
      function resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(state);
          }, 2000);
        });
      }

      console.log('calling');
      var result = await resolveAfter2Seconds();
      console.log(result);
      return result;
    }
    // end of _loadCurrentUserAccounts

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
