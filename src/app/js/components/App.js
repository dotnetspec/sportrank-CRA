import Header from './Header'
import Main from './Main'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import imgAvatar from '../../img/avatar-default.png';
import { map } from 'async';
import JSONops from './JSONops'
import { formatEth } from '../utils';
import web3 from '../../../web3';
import DSportRank from '../../../ABIaddress';
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
    //cb from GlobalRankings.js to set the rank id  selected by the user
    export function newrankIdCB(newrankIdCB) {
      console.log('in newrankIdCB', newrankIdCB)
        this.setState({newrankIdCB})
    }
    //cb from GlobalRankings.js to set the rank state as view only
    export function viewingOnlyCB(viewingOnlyCB) {
      console.log('in viewingOnlyCB', viewingOnlyCB)
        this.setState({viewingOnlyCB})
    }

//for dev - utility - timer
    let startTime = performance.now();  //Run at the beginning of the code
    function executingAt() {
      return (performance.now() - startTime) / 1000;
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
      description:''
    }
    //bind the callback functions
    updatedExtAcctBalCB = updatedExtAcctBalCB.bind(this);
    contactNoCB = contactNoCB.bind(this);
    emailCB = emailCB.bind(this);
    userNameCB = userNameCB.bind(this);
    //click List All Rankings and Enter to reset the default ranking to display
    newrankIdCB = newrankIdCB.bind(this);
    viewingOnlyCB = viewingOnlyCB.bind(this);
  }
  //#endregion

  //#region Helper methods
  //_loadsetJSONData being used here and not in JSONops because of need to setState
_loadsetJSONData = async () => {
  try {
    //e.g. let httpStr = 'https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/latest';
  let httpStr = 'https://api.jsonbin.io/b/' + this.state.newrankIdCB + '/latest';
  let responseDataAsArray = [];
  console.log('httpStr', httpStr)
  await fetch(httpStr)
  //await fetch('https://api.jsonbin.io/b/' + httpStr + '/latest')
    //await fetch('https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/1000')
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.length !== 0){
         console.log('json returns with length ' + responseJson.length + 'in _loadsetJSONData in app.js')
         console.log('responseJson data', responseJson)
         //HACK: it appears this code is not being used but commit
         // made as new rankings are being created for new users without error
         //on creation of a new user the [] isn't recognized
         //although the new json object comes back BootstrapTable cannot handle it.So convert here:
         if(responseJson.length === undefined){
           //turn the object into an array for use by BSTable
           //responseJson = "[" + responseJson + "]";
           responseDataAsArray[0] = responseJson;
           responseJson = responseDataAsArray;
           console.log('responseJson converted to array', responseJson)
         }
             this.setState({
               data: responseJson,
               //data: responseDataAsArray,
               //REVIEW: loadingJSON not currently being used
               loadingJSON: false,
               //NB: data in state is slow to keep up, use responseJson!
               isUserInJson: JSONops.isPlayerListedInJSON(responseJson, this.state.user.username),
               rank: JSONops._getUserValue(responseJson, this.state.user.username, "RANK"),
               updatedExtAcctBalCB: this._loadExternalBalance(),
               isCurrentUserActive: JSONops._getUserValue(responseJson, this.state.user.username, "ACTIVE"),
               //isRankingIDInvalid: JSONops.isRankingIDInvalid(responseJson[0])
             }
         , function(){
             });
           }
     })
  //REVIEW:this.setState({ isLoading: false });the 'return' is not important, the setState is
  return null;
}catch (err) {
     return console.error(err);
  }
}
//TODO: together with _loadsetJSONData need to refactor into single source for fetch code
_loadsetRankingListJSONData = async () => {
  try {
    //e.g. let httpStr = 'https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/latest';
    let httpStr = 'https://api.jsonbin.io/b/' + this.state.rankingDefault + '/latest';
  let responseDataAsArray = [];
  console.log('httpStr', httpStr)
  await fetch(httpStr)
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.length !== 0){
         console.log('json returns with length ' + responseJson.length)
         console.log('responseJson data', responseJson)
         //HACK: it appears this code is not being used but commit
         // made as new rankings are being created for new users without error
         //on creation of a new user the [] isn't recognized
         //although the new json object comes back BootstrapTable
         //cannot handle it.So convert here:
         if(responseJson.length === undefined){
           //turn the object into an array for use by BSTable
           //responseJson = "[" + responseJson + "]";
           responseDataAsArray[0] = responseJson;
           responseJson = responseDataAsArray;
           console.log('responseJson converted to array', responseJson)
         }
         //if the response comes back with 'Route not found!' error msg will trigger a warning on table display
         responseJson = JSONops.deleteRouteNotFoundInGlobalJson(responseJson);
             this.setState({
               rankingListData: responseJson
               //loadingRankingListJSON: false
               //,
               //NB: data in state is slow to keep up, use responseJson for future query ops ...
               //REVIEW: may need functionality similar to following in future:
               //updatedExtAcctBalCB: this._loadExternalBalance(),
               //isCurrentUserActive: JSONops._getUserValue(responseJson, this.state.user.username, "ACTIVE")
             }
         , function(){
             });
           }
     })
  //REVIEW:
  //this.setState({ isLoading: false });
  //the 'return' is not important, the setState is
  return null;
}catch (err) {
     return console.error(err);
  }
}
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


//the 'real' code
//
  _loadCurrentUserAccounts = async () => {
    console.log('_loadCurrentUserAccounts')
      // get all the accounts the node controls
      //await EmbarkJS.Blockchain.connect(DSportRank);
      //web3.Blockchain.co
      console.log('about to do await on getAccounts(), when done - got accounts after await')
      console.log('exec at', executingAt());
      const accountsFromTheBC = await web3.eth.getAccounts();
        console.log('got accounts after await', accountsFromTheBC)
        console.log('exec at', executingAt());

        console.log('the data', this.state.data);

        //accountsFromTheBC just indicates how many times to iterate. It isn't used
        //otherwise

      // Generates a mapping of users and accounts to be used
      // for populating the accounts dropdown
      // map takes 3 args -
      // current item value (accounts);
      // current item index (async function (address, next))
      // the array itself that the map was called upon.
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
        //(labelled address and next), which come back as promises,
        //to it's 3rd param userAccounts

        //I think this is designed so that the current item value (accountsFromTheBC)
        //becomes the first param in the async function
        //callback is the name of any function that you name that can be called within this
        //async function (perhaps it can be moved out?)
        async function (address, callback) {
            try {
              console.log('callback inside await map', callback)
              console.log('address inside await map', address)
              // get the owner details for this address from the contract
              console.log('about to get usernameHash, when done - got usernameHash after await')
              console.log('exec at', executingAt());
              const usernameHash = await DSportRank.methods.owners(address).call();
              console.log('got usernameHash after await', usernameHash)
              console.log('exec at', executingAt());
              // get user details from contract
              const user = await DSportRank.methods.users(usernameHash).call();
              //
              // //console.log('_loadCurrentUserAccounts 3')
              // //below just used for logging
              //     if (user.username !== ''){
              //     console.log('user.username', user.username)
              //     console.log('user.contactno', user.contactno)
              //     //console.log('rankingList', rankingList)
              //     console.log('user.creationDate', user.creationDate)
              //     console.log('user.description', user.description)
              //     console.log('user.rankingDefault', user.rankingDefault)
              //     //console.log('user.challenges', user.challenges)
              //     }//end if

              // gets the balance of the address
              let balance = await web3.eth.getBalance(address);
              balance = web3.utils.fromWei(balance, 'ether');
              console.log('balance', balance)
              //REVIEW: stopped execution here after first account loads
              //to prevent Callback already called error
              //return null;
              // update user picture with ipfs url
              //user.picture = user.picture.length > 0 ? EmbarkJS.Storage.getUrl(user.picture) : imgAvatar;
              // add the following mapping to our result
              //console.log('callback1', callback)
              //call the callback function and wait for it's promise
              //(async functions return promises)
              //console.log('user', user)
              //this.setState({
                // address: address,
                // user: user,
                // balance: balance
              //}) //end of the setState
              callback(null, {
                address: address,
                user: user,
                balance: balance
                //,
                //NB: added by me:
                //updatedExtAcctBalCB: globalVardevAccountBalResult
              });
              console.log('callback2', callback)
            }
            catch (err) {
              console.log("Error within current item index", err);

              //next(err);
            }//end of try/catch within async function definition within await/map
          }//end of async function definition within await map

          //param 3 - the array itself that the map was called upon
          //this moment seemingly confusingly is used to
          //do a whole series of state var assignments
      , (err, userAccounts) => {
        //err is only relevant in the next line
        if (err) return this._onError(err, 'App._loadCurrentUserAccounts');
        //console.log('user in 3rd param', user)
        console.log('userAccounts array', userAccounts)
        console.log('web3.eth.defaultAccount', web3.eth.getAccounts(accounts => console.log(accounts[0])))
        //now all these assignments are done on the userAccounts array
        let defaultUserAccount = userAccounts.find((userAccount) => {
          return userAccount.address === web3.eth.defaultAccount;
          //return userAccount.address === web3.eth.getAccounts(accounts => console.log(accounts[0]));
        });
        //HACK: I think only works for 1 account
        //I'm forced to specify array index[0] when it wasn't previously required
        defaultUserAccount = userAccounts;
        console.log('accountsFromTheBC in third param', userAccounts)
        console.log('here 1')
        console.log('defaultUserAccount', defaultUserAccount)
        console.log('defaultUserAccount.user.username', defaultUserAccount[0].user.username)
        console.log('here 1a')
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
      console.log('this.state.account', this.state.account)
        console.log('ready to _loadsetRankingListJSONData after a render')
        console.log('isUserInJson', this.state.isUserInJson)

        console.log('isCurrentUserActive', this.state.isCurrentUserActive)
        //json won't be loaded until there is at least a default ranking initially
        //otherwise we'll be going to createuser
        //if(this.state.rankingDefault !== ''){
          //REVIEW: possibly use JSONops._loadsetJSONData here if
          //will allow setState here
          //OR use componentDidMount
        this._loadsetJSONData();

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

  //TODO:add code to get from jsonbin.io
  //we are using this and not JSONops because we need to set state here
  //get a new rankid ready in case user wants/needs to create a new ranking
  //do this after _loadsetJSONData so that we will already have the correct username
  getNewRankId = async () => {
    console.log('userNameCB in getNewRankId in app', this.state.userNameCB)
      try{
      this.setState({ isLoading: true});
      let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
          //this async section tests whether the result
          //from the code lower down has been returned
          //(without using await)
          if (req.readyState === XMLHttpRequest.DONE) {
            const resulttxt = JSON.parse(req.responseText);
            //only here can set state (once result is back)
            this.setState({ newrankId: resulttxt.id});
            console.log("this.state.newrankId", this.state.newrankId)
            //this.setState({ ranknameHasChanged: true});
            this.setState({ isLoading: false});
            // console.log('this.state.rankId')
            // console.log(this.state.rankId)
          }
        };
        //NB: following will send the request but
        //need to wait for the results to come back
        //(above) before any further processing can be
        //don
        var obj = {
        DATESTAMP: Date.now(),
        ACTIVE: true,
        DESCRIPTION: this.state.description,
        CURRENTCHALLENGERNAME: "AVAILABLE",
        CURRENTCHALLENGERID: 0,
        ACCOUNT: this.state.account,
        EMAIL: this.state.emai,
        CONTACTNO: this.state.contactno,
        RANK: 1,
        NAME: this.state.user,
        id: 1 };

        let myJSON = JSON.stringify(obj);
        console.log('getNewRankId using myJSON', myJSON)

        req.open("POST", "https://api.jsonbin.io/b", true);
        //req.open("PUT", "https://api.jsonbin.io/b", true);
        req.setRequestHeader("Content-type", "application/json");
        //req.send('{"Player": "Johan Straus"}') || {}
        req.send(myJSON)
        //|| {}
        }catch (err) {
        // stop loading state and show the error
        console.log(err)
        this.setState({ isLoading: false, error: err.message });
      };
        return null;
    }
//REVIEW: below based on
//https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
//to a (small) degree - anyway it's a useful reference
  _loadExternalBalance = async () => {
    try {
    let devAccountBalResult = await web3.eth.getBalance("0xd496e890fcaa0b8453abb17c061003acb3bcc28e");
    devAccountBalResult = web3.utils.fromWei(devAccountBalResult, 'ether');
    devAccountBalResult =  formatEth(devAccountBalResult, 3);
    this.setState({
      updatedExtAcctBalCB: devAccountBalResult
    });
    this.setState({ loadingExtBal: false });
    this.setState({ isLoading: false });

    //the 'return' is not important, the setState is
    return devAccountBalResult;
    //REVIEW: don't know what this kind of return statement is currently
  }catch (err) {
        return {
            name: 'default user'
        };
    }
  }
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
    //EmbarkJS.onReady(() => {
      try{
      this._loadCurrentUserAccounts();

      console.log('this.state.account', this.state.account)
      }catch(e){
        console.log('componentDidMount _loadCurrentUserAccounts()', e)
      }
      //console.log('rankingListData:data', this.state.rankingListData)
   //}
  //);
    //if newRankId is blank a user either has just loaded the app or has clicked the
    //ListAllRankingss btn
    console.log('this.state.newrankIdCB', this.state.newrankIdCB)
    if(this.state.newrankIdCB === ''){
    this._loadsetRankingListJSONData();
    }else{
    //   console.log('about to run _loadsetJSONData')
    this._loadsetJSONData();
    }
    console.log('this.state.user.username in componentDidMount in app', this.state.user.username)
    if(this.state.user.username !== undefined){
    this.getNewRankId();
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
          user={this.state.user}
          account={this.state.account}
          userAccounts={this.state.userAccounts}
          balance={this.state.balance}
          error={this.state.error}
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
          onAfterUserUpdate={(e) => this._loadCurrentUserAccounts()}
          onError={(err, source) => this._onError(err, source)}
          rankingJSONdata={this.state.data}
          rankingListJSONdata={this.state.rankingListData}
          updatedExtAcctBalCB={this.state.updatedExtAcctBalCB}
          contactNoCB={this.state.contactNoCB}
          emailCB={this.state.emailCB}
          rank={this.state.rank}
          isCurrentUserActive={this.state.isCurrentUserActive}
          isRankingIDInvalid={this.state.isRankingIDInvalid}
          newrankId={this.state.newrankId}
          rankingDefault={this.state.rankingDefault}
          getNewRankingID={(e) => this.getNewRankId()}
          newrankIdCB={this.state.newrankIdCB}
          viewingOnlyCB={this.state.viewingOnlyCB}
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
