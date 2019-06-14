import Header from '../UI/Header'
import Main from './Main'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import imgAvatar from '../../../img/avatar-default.png';
import { map } from 'async';
import JSONops from './JSONops'
import { formatEth, executingAt } from '../../utils';
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId } from '../SideEffects/io/Jsonio';
import { _loadCurrentUserAccountsInsideMapping, _loadExternalBalance } from '../SideEffects/io/web3io';
//import p-iteration from 'p-iteration'

//REVIEW: is the solution to this to write your own api?
//import jsonData from '../../json/Rankings.json'

//REVIEW: Global variable
//currently only assigned when click challenge... button
 //let currentUserRank = 0;
 //devAccountTemp used to avoid 'callback' errors
 //let globalVardevAccountBalResult = 0;

//Callback functions:
//called in DoChallenge.js and used by Header.js to update the external account
//balance state
    export function updatedExtAcctBalCB(updatedExtAcctBalCB) {
        this.setState({updatedExtAcctBalCB})
    }
    //these cb functions update the relevant components
    //DoChallenge.js
    export function contactNoCB(contactNoCB) {
        this.setState({contactNoCB})
    }
    export function emailCB(emailCB) {
        this.setState({emailCB})
    }
    //cb functions based on the data in the json
    export function jsonHasRankingID(jsonHasRankingID) {
        this.setState({jsonHasRankingID})
    }
    export function jsonHasData(jsonHasData) {
        this.setState({jsonHasData})
    }
    export function currentUserRank(currentUserRank) {
        this.setState({currentUserRank})
    }
    //cb from createuser.js to set the username
    //in time for getNewRankingID() to put it in the json
    export function userNameCB(userNameCB) {
      console.log('in userNameCB', userNameCB)
        this.setState({userNameCB})
    }
    // //cb from GlobalRankings.js to set the rank id  selected by the user
    // export function newrankIdCB(newrankIdCB) {
    //   console.log('in newrankIdCB', newrankIdCB)
    //     this.setState({newrankIdCB});
    //     _loadsetJSONData(newrankIdCB, _loadsetJSONData_callback);
    // }

    //cb from web3io.js to set the state of the external balance
    export function _loadExternalBalance_callback(balance) {
      //console.log('data account in callback', data[0].ACCOUNT);
      //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
       //done();
       console.log('balance', balance)
       this.setState({
                         updatedExtAcctBalCB: balance
       })
     }


    export function _loadsetJSONData_callback(data) {
      console.log('data account in callback', data[0].ACCOUNT);
      //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
       //done();
       this.setState({
                         data: data,
                         //data: responseDataAsArray,
                         //REVIEW: loadingJSON not currently being used
                         loadingJSON: false,
                         //NB: data in state is slow to keep up, use responseJson!
                         isUserInJson: JSONops.isPlayerListedInJSON(data, this.state.user.username),
                         rank: JSONops._getUserValue(data, this.state.user.username, "RANK"),
                         //updatedExtAcctBalCB: this._loadExternalBalance(),
                         isCurrentUserActive: JSONops._getUserValue(data, this.state.user.username, "ACTIVE"),
                         //isRankingIDInvalid: JSONops.isRankingIDInvalid(responseJson[0])
       })
     }

     export function _loadsetRankingListJSONData_callback(data) {
       console.log('data account in _loadsetRankingListJSONData_callback', data[0].RANKINGNAME);
        this.setState({
              rankingListData: data
              //loadingRankingListJSON: false
            })
      }

      export function getNewRankId_callback(data){
        this.setState({ newrankId: data.id});
        this.setState({ ranknameHasChanged: true});
        this.setState({ isLoading: false});
      }

      export function _loadCurrentUserAccountsInsideMapping_callback(data){
        this.setState({ address: data.address});
        this.setState({ user: data.user});
        this.setState({ balance: data.balance});
      }

/**
 * Class representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 *
 * @extends React.Component
 */
class App extends Component {
  //#region Constructor
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      account: '',
      error: {},
      userAccounts: [],
      balance: 0,
      data: [],
      currentUserRank: 0,
      updatedExtAcctBalCB: 0,
      isLoading: true,
      contactNoCB:'',
      emailCB:'',
      usersRankingLists: [],
      isUserInJson: false,
      jsonHasRankingID: false,
      jsonHasData: false,
      test: [],
      loadingAccounts: true,
      loadingJSON: true,
      loadingExtBal: true,
      isCurrentUserActive: false,
      isRankingIDInvalid: false,
      challenges: [],
      newrankId: '',
      //rankingDefault is the global ranking list json
      rankingDefault: '5c36f5422c87fa27306acb52',
      userNameCB: '',
      loadingRankingListJSON: true,
      rankingListData: [],
      newrankIdCB:'',
      viewingOnlyCB: true,
      contactno: '',
      email: '',
      description:'',
      specificRankingOptionBtns: false
    }
    //bind the callback functions
    updatedExtAcctBalCB = updatedExtAcctBalCB.bind(this);
    contactNoCB = contactNoCB.bind(this);
    emailCB = emailCB.bind(this);
    userNameCB = userNameCB.bind(this);
    //click List All Rankings and Enter to reset the default ranking to display
    this.viewingOnlyCB = this.viewingOnlyCB.bind(this);
    _loadsetJSONData_callback = _loadsetJSONData_callback.bind(this);
    _loadsetRankingListJSONData_callback = _loadsetRankingListJSONData_callback.bind(this);
    getNewRankId_callback = getNewRankId_callback.bind(this);
    _loadExternalBalance_callback = _loadExternalBalance_callback.bind(this);
    this.handleChildClick = this.handleChildClick.bind(this);
    this.handleListAllChildClick = this.handleListAllChildClick.bind(this);
    this.newrankIdCB = this.newrankIdCB.bind(this);
    this.isCurrentUserActiveCB = this.isCurrentUserActiveCB.bind(this);

  }

//Below appears to be relevant to user events not e.g. callbacks that fetch data
  //display the ranking specific btn options
  handleChildClick() {
        this.setState({specificRankingOptionBtns:true})
    }

   handleListAllChildClick(){
     this.setState({specificRankingOptionBtns:false})
   }

   //cb from GlobalRankings.js to set the rank id selected by the user
   newrankIdCB(newRankIdparam) {
       this.setState({newrankIdCB:newRankIdparam});
       _loadsetJSONData(newRankIdparam, _loadsetJSONData_callback);
   }

   //cb from GlobalRankings.js to set the rank state as view only
   //REVEIW: is this necessary? wasn't working until noticed it ...
   viewingOnlyCB(viewingOnlyCB) {
     console.log('in viewingOnlyCB', viewingOnlyCB)
       this.setState({viewingOnlyCB:viewingOnlyCB})
   }

   //cb from PlayerStatusBtn.js to set the state of the button
   isCurrentUserActiveCB(BtnState) {
     console.log('in isCurrentUserActive', BtnState)
       this.setState({isCurrentUserActive:BtnState})
   }



   // newrankIdCB (callback, param1, param2) {
   //   console.log('callback', callback,param1, param2)
   //     callback (param1, param2);
   // }

  //#endregion

  //#region Helper methods

//REVIEW: Possible to getUserRank in App.js (and set state) rather than Home.js?
//currently no - problem is waiting for username to check against rank
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

//_loadCurrentUserAccounts uses an anonymous async function to assign
//the accounts array from web3.eth.getAccounts() to the State array 'userAccounts'
//via each address in the map function  (which does: return userAccount.address)
  _loadCurrentUserAccounts = async () => {
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
          console.log('about to return default userAccount.address', web3.eth.defaultAccount);
          return userAccount.address === web3.eth.defaultAccount;
          //return userAccount.address === web3.eth.getAccounts(accounts => console.log(accounts[0]));
        });
        //now all these assignments are done as the values are added,
        //one at a time, to the userAccounts array
        //HACK: I think only works for 1 account
        //I'm forced to specify array index[0] when it wasn't previously required
        defaultUserAccount = userAccounts;
        // console.log('accountsFromTheBC in third param', userAccounts)
        // console.log('here 1')
        // console.log('defaultUserAccount', defaultUserAccount)
        // console.log('defaultUserAccount.user.username', defaultUserAccount[0].user.username)
        // console.log('here 1a')
        //check that there is an existing default account user
        //before setting state, and if there isn't go to create
        if(defaultUserAccount[0].user.username === '' || defaultUserAccount[0].user.username === undefined){
          console.log('here 2')
          this.setState({
          rankingDefault: '',
          isUserInJson: false,
          isCurrentUserActive:false });
          this.props.history.push('/create');
        }else{
          console.log('here 3')
        //console.log('ready to set state which will prompt re-render')
        console.log('new rankingDefault to be set in loadingAccounts', defaultUserAccount[0].user.rankingDefault)
        this.setState({
          //rank: JSONops._getUserValue(this.state.data, this.state.user.username, "RANK"),
          //rankingDefault: defaultUserAccount[0].user.rankingDefault,
          //REVEIW: perhaps change the naming of rankingDefault as it may be confusing
          //now that it is set by the user selection in GlobalRankings not the default value
          // in the contract

          newrankId: defaultUserAccount[0].user.rankingDefault,
          isUserInJson: JSONops.isPlayerListedInJSON(this.state.data, this.state.user.username),
          isCurrentUserActive: JSONops._getUserValue(this.state.data, this.state.user.username, "ACTIVE")
        }) //end of the setState
      }//end of the if
console.log('here 4')
//common setState
//the most important setState is the first one, which is the point of this
//
      this.setState({ userAccounts: userAccounts,
        user: defaultUserAccount[0].user,
        contactno: defaultUserAccount[0].user.contactno,
        email: defaultUserAccount[0].user.email,
        description: defaultUserAccount[0].user.description,
        //account: web3.eth.defaultAccount,
        account: defaultUserAccount[0].address,
        balance: defaultUserAccount[0].balance,
        //rank: JSONops._getUserValue(this.state.data, this.state.user.username, "RANK"),
        contactNoCB: '',
        emailCB: '',
        loadingAccounts: false,
        //newrankId must be cleared so a new one has to be regenerated for each account
        newrankId: '',
        viewingOnlyCB: true
      }) //end of the setState
      console.log('here 5')
      //console.log('this.state.account', this.state.account)
        console.log('ready to _loadsetRankingListJSONData after a render')
        console.log('isUserInJson', this.state.isUserInJson)

        console.log('isCurrentUserActive', this.state.isCurrentUserActive)
        //json won't be loaded until there is at least a default ranking initially
        //otherwise we'll be going to createuser
        //if(this.state.rankingDefault !== ''){
          //REVIEW: possibly use JSONops._loadsetJSONData here if
          //will allow setState here
          //OR use componentDidMount
        //this._loadsetJSONData();

        console.log('this.state.data', this.state.data)

      }//end of the functionality that has (mysteriously) been added into
      //what should have been simply passing an array into a map function
      //however, much critical assignment is done in this stage

    );////end of whole of await map including error Checking
    //I think a .then() could be added at the end of the await[?]
      console.log('end of loadingAccounts')
      //currently forcing loading accounts to end once the
      //current or first account has been found (to enable app to load)
      //multiple account loading not currently a priority
      //actual - didn't work code continues (don't know why)
      this.setState({
        loadingAccounts: false
      })
      console.log('this.state.loadingAccounts',this.state.loadingAccounts)
  }// end of _loadCurrentUserAccounts


  /**
   * Sets the App state error and redirects the user to the error page
   *
   * @param {Error} err - error encountered
   */
  _onError(err, source) {
    if (source) err.source = source;
    this.setState({ error: err });
    this.props.history.push('/whoopsie');
  }
  //#endregion

  //#region React lifecycle events
  //loading the network functions from here
  //render() has already rendered at least once before
  // componentDidMount runs
  //any change with setState here will re-render app.js
  //async componentDidMount() {
  componentDidMount() {
      try{
        //https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
        //to a (small) degree - anyway it's a useful reference
        _loadExternalBalance(_loadExternalBalance_callback);
        //console.log('this.state.newrankIdCB before _loadCurrentUserAccounts', this.state.newrankIdCB)
        if(this.state.newrankIdCB === ''){
          this._loadCurrentUserAccounts();
        }
      //_loadsetJSONData(this.state.newrankIdCB, callback);
      //console.log('this.state.account', this.state.account)
      }catch(e){
        //console.log('componentDidMount app _loadCurrentUserAccounts()', e)
      }
    //if newRankId(CB?) is blank a user either has just loaded the app or has clicked the
    //ListAllRankingss btn
    //console.log('this.state.newrankIdCB', this.state.newrankIdCB)
    if(this.state.newrankIdCB === ''){
      //uses json.io
      _loadsetRankingListJSONData(this.state.rankingDefault,_loadsetRankingListJSONData_callback);
    }
    console.log('this.state.user.username in componentDidMount in app', this.state.user.username)
    if(this.state.user.username !== undefined){
      //uses json.io
      //REVIEW: shouldn't callback be last arg?
      getNewRankId(getNewRankId_callback, "test description", '123456', 'test@test.com', '67890', 'player1');
    }
  }

  render() {
    //from https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41
    if(this.state.data === null){
      return <imgAvatar />;
    }
//   console.log('rendering now in app render()')
//   if(!this.state.isLoading){
//   console.log('this.state.loadingAccounts in app render()', this.state.loadingAccounts)
//   console.log('rank in app render()', this.state.rank)
//   console.log('this.state.updatedExtAcctBalCB in app render()', this.state.updatedExtAcctBalCB)
//   console.log('this.state.isUserInJson in app render()', this.state.isUserInJson)
//   console.log('this.state.isCurrentUserActive in app render()',this.state.isCurrentUserActive)
// }
    return (
      <div>
        <Header
          data-testid='header'
          user={this.state.user}
          account={this.state.account}
          userAccounts={this.state.userAccounts}
          balance={this.state.balance}
          error={this.state.error}
          isCurrentUserActive={this.state.isCurrentUserActive}
          isCurrentUserActiveCB={(e) => this.isCurrentUserActiveCB()}
          onChildClick={(e) => this.handleChildClick()}
          onListAllChildClick={(e) => this.handleListAllChildClick()}
          specificRankingOptionBtns={this.state.specificRankingOptionBtns}
          onAfterUserUpdate={(e) => this._loadCurrentUserAccounts()}
          onError={(err, source) => this._onError(err, source)}
          rankingJSONdata={this.state.data}
          rankingListJSONdata={this.state.rankingListData}
          updatedExtAcctBalCB={this.state.updatedExtAcctBalCB}
          usersRankingLists={this.state.usersRankingLists}
          isUserInJson={this.state.isUserInJson}
          rankingDefault={this.state.rankingDefault}
          newrankId={this.state.newrankId}
          newrankIdCB={this.state.newrankIdCB}
          />
        <Main
          user={this.state.user}
          contactno={this.state.contactno}
          email={this.state.email}
          description={this.state.description}
          account={this.state.account}
          userAccounts={this.state.userAccounts}
          error={this.state.error}
          onChildClick={(e) => this.handleChildClick()}
          specificRankingOptionBtns={this.state.specificRankingOptionBtns}
          onAfterUserUpdate={(e) => this._loadCurrentUserAccounts()}
          onError={(err, source) => this._onError(err, source)}
          rankingJSONdata={this.state.data}
          rankingListJSONdata={this.state.rankingListData}
          contactNoCB={this.state.contactNoCB}
          emailCB={this.state.emailCB}
          rank={this.state.rank}
          isCurrentUserActive={this.state.isCurrentUserActive}
          isRankingIDInvalid={this.state.isRankingIDInvalid}
          newrankId={this.state.newrankId}
          rankingDefault={this.state.rankingDefault}
          getNewRankingID={(e) => this.getNewRankId()}
          newrankIdCB={this.newrankIdCB.bind(this)}
          viewingOnlyCB={this.viewingOnlyCB.bind(this)}
          isUserInJson={this.state.isUserInJson}
          loadingJSON={this.state.loadingJSON}
          />
      </div>
    );
  // }else{
  //   return (
  //   <div>...loading</div>
  // );
  // }

  }
  //#endregion
}

export default withRouter(App)
