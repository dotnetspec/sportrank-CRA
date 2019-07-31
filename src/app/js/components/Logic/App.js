import Header from '../UI/Header'
import Main from './Main'
import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useReducer
} from 'react';
import {
  withRouter
} from 'react-router-dom'
import ImgAvatar from '../../../img/avatar-default.png';
import {
  map
} from 'async';
import JSONops from './JSONops'
import {
  formatEth,
  executingAt
} from '../../utils';
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
import {
  _loadsetJSONData,
  _loadsetRankingListJSONData,
  getNewRankId,
  getDefaultRankingList
} from '../SideEffects/io/Jsonio';
import {
  _loadCurrentUserAccountsInsideMapping,
  _loadExternalBalance,
  _mapCurrentUserAccounts,
  getCurrentUserAccountsFromBlockchain
} from '../SideEffects/io/web3io';
import axios from 'axios'
//import p-iteration from 'p-iteration'

//REVEIW: perhaps change the naming of rankingDefault as it may be confusing
//now that it is set by the user selection in GlobalRankings not the default value
// in the contract

//const Main = React.lazy(() => import ('./Main'));

//REVIEW: is the solution to this to write your own api?
//import jsonData from '../../json/Rankings.json'

//Callback functions:
//called in DoChallenge.js and used by Header.js to update the external account
//these cb functions update the relevant components
//DoChallenge.js
// export function contactNoCB(contactNoCB) {
//     //setState({contactNoCB})
//     setcontactNoCB(contactNoCB);
// }
// export function emailCB(emailCB) {
//     //setState({emailCB})
//     setemailCB(emailCB);
// }
// //cb functions based on the data in the json
// export function jsonHasRankingID(jsonHasRankingID) {
//     //setState({jsonHasRankingID})
//     setjsonHasRankingID(jsonHasRankingID);
// }
// export function jsonHasData(jsonHasData) {
//     //setState({jsonHasData})
//     setjsonHasData(jsonHasData);
// }
// export function currentUserRank(currentUserRank) {
//     //setState({currentUserRank})
//     setCurrentUserRank(currentUserRank);
// }
// //cb from createuser.js to set the username
// //in time for getNewRankingID() to put it in the json
// export function userNameCB(userNameCB) {
//   //console.log('in userNameCB', userNameCB)
//     //setState({userNameCB})
//     setuserNameCB(userNameCB);
// }
//
// //cb from web3io.js to set the state of the external balance
// export function _loadExternalBalance_callback(balance) {
//   //console.log('data account in callback', data[0].ACCOUNT);
//   //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
//    //done();
//    //console.log('balance', balance)
//        if(balance !== undefined){
//          //setState({ updatedExtAcctBalCB: balance })
//          setBalance(balance);
//       }
// }

//   export function _loadCurrentUserAccountsInsideMapping_callback(data){
//     //setState({ address: data.address});
//     setaddress(data.address);
//     //setState({ user: data.user});
//     setuser(data.user);
//     //setState({ balance: data.balance});
//     setBalance(data.balance)
//   }

/**
 * Class representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 *
 * @extends React.Component
 */
//class App extends Component {
export function App({
  props
}) {

  //  function contactNoCB(contactNoCB) {
  //     //setState({contactNoCB})
  //     setcontactNoCB(contactNoCB);
  // }
  // function emailCB(emailCB) {
  //     //setState({emailCB})
  //     setemailCB(emailCB);
  // }
  //cb functions based on the data in the json
  // function jsonHasRankingID(jsonHasRankingID) {
  //     //setState({jsonHasRankingID})
  //     setjsonHasRankingID(jsonHasRankingID);
  // }
  // function jsonHasData(jsonHasData) {
  //     //setState({jsonHasData})
  //     setjsonHasData(jsonHasData);
  // }
  // function currentUserRankCB(currentUserRank) {
  //   //setState({currentUserRank})
  //   setCurrentUserRank(currentUserRank);
  // }
  // //cb from createuser.js to set the username
  // //in time for getNewRankingID() to put it in the json
  // function userNameCB(userNameCB) {
  //   //console.log('in userNameCB', userNameCB)
  //     //setState({userNameCB})
  //     setuserNameCB(userNameCB);
  // }

  //cb from web3io.js to set the state of the external balance
  function _loadExternalBalance_callback(externalbalance) {
    //console.log('data account in callback', data[0].ACCOUNT);
    //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
    //done();
    //console.log('externalbalance', externalbalance)
    if (externalbalance !== undefined) {
      //setState({ updatedExtAcctBalCB: balance })
      setupdatedExtAcctBalCB(externalbalance);
    }
  }

  function _loadsetJSONData_callback(data) {
    //console.log('data account in callback', data[0].ACCOUNT);
    //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
    setdata(data);
    setisLoadingJSON(false);
    setIsUserInJson(JSONops.isPlayerListedInJSON(data, user.username));
    setrank(JSONops._getUserValue(data, user.username, "RANK"));
    setIsCurrentUserActive(JSONops._getUserValue(data, user.username, "ACTIVE"));
  }

  function getNewRankId_callback(data) {
    //setState({ newrankId: data.id});
    setnewrankId(data.id);
    //setState({ ranknameHasChanged: true});
    setranknameHasChanged(true);
    //setState({ isLoading: false});
    setIsLoading(false);
  }

  function _loadCurrentUserAccountsInsideMapping_callback(data) {
    //setState({ address: data.address});
    setaddress(data.address);
    //setState({ user: data.user});
    setuser(data.user);
    //setState({ balance: data.balance});
    setBalance(data.balance)
  }

  const [user, setuser] = useState({});
  //     account: '',
  const [account, setAccount] = useState('');
  //     error: {},
  const [error, setError] = useState({});
  //     userAccounts: [],
  const [userAccounts, setuserAccounts] = useState([])
  //     balance: 0,
  const [balance, setBalance] = useState(0)
  //     data: [],
  const [data, setdata] = useState([])
  //     currentUserRank: 0,
  //const [currentUserRank, setCurrentUserRank] = useState(0)
  //     updatedExtAcctBalCB: 0,
  const [updatedExtAcctBalCB, setupdatedExtAcctBalCB] = useState(0)
  //     isLoading: true,
  const [isLoading, setIsLoading] = useState(true)
  //     contactNoCB:'',
  //const [contactNoCB, setcontactNoCB] = useState('')
  //     emailCB:'',
  //const [emailCB, setemailCB] = useState('')
  //     usersRankingLists: [],
  const [userRankingLists] = useState([]);
  //     isUserInJson: false,
  const [isUserInJson, setIsUserInJson] = useState(false);
  //     jsonHasRankingID: false,
  //const [jsonHasRankingID, setjsonHasRankingID] = useState(false);;
  //     jsonHasData: false,
  //const [jsonHasData, setjsonHasData] = useState(false);
  //     loadingAccounts: true,
  //const [isLoadingAccounts, setisLoadingAccounts] = useState(true);
  //     loadingJSON: true,
  const [isLoadingJSON, setisLoadingJSON] = useState(true);
  //     loadingExtBal: true,
  //const [isLoadingExtBal, setIsLoadingExtBal] = useState(true);
  //     isCurrentUserActive: false,
  const [isCurrentUserActive, setIsCurrentUserActive] = useState(false);
  const [isCurrentUserActiveCB] = useState(false);
  //     isRankingIDInvalid: false,
  const [isRankingIDInvalid] = useState(false);
  //     newrankId: '',
  const [newrankId, setnewrankId] = useState('');
  //     //rankingDefault is the global ranking list json
  //     rankingDefault: '5c36f5422c87fa27306acb52',
  const [rankingDefault] = useState('5c36f5422c87fa27306acb52');
  //     userNameCB: '',
  //const [userNameCB, setuserNameCB] = useState('');
  //     loadingRankingListJSON: true,
  //const [isLoadingRankingListJSON, setisLoadingRankingListJSON] = useState(true);
  //     rankingListData: [],
  const [rankingListData, setrankingListData] = useState([]);
  //     newrankId:'',
  //const [newrankId, setnewrankIdCB] = useState('');
  //     viewingOnlyCB: true,
  const [viewingOnlyCB, setviewingOnlyCB] = useState(true);

  //     contactno: '',
  const [contactno, setcontactno] = useState('');
  //     email: '',
  const [email, setemail] = useState('');
  //     description:'',
  const [description, setdescription] = useState('');
  //     specificRankingOptionBtns: false
  const [specificRankingOptionBtns, setspecificRankingOptionBtns] = useState(false);

  const [rank, setrank] = useState('1');
  const [ranknameHasChanged, setranknameHasChanged] = useState('');
  const [address, setaddress] = useState('');



  //Below appears to be relevant to user events not e.g. callbacks that fetch data
  //display the ranking specific btn options
  const handleChildClick = () => {
    //setState({specificRankingOptionBtns:true});
    setspecificRankingOptionBtns(true);
  }

  const handleListAllChildClick = () => {
    //setState({specificRankingOptionBtns:false})
    setspecificRankingOptionBtns(false);
  }

  //cb from GlobalRankings.js to set the rank state as view only
  //REVEIW: is this necessary? wasn't working until noticed it ...
  const setOnCallbackviewingOnlyCB = (viewingOnlyCBval) => {
    // console.log('in viewingOnlyCB', viewingOnlyCB)
    //   setState({viewingOnlyCB:viewingOnlyCB})
    setviewingOnlyCB(viewingOnlyCBval);
  }

  //cb from PlayerStatusBtn.js to set the state of the button
  //from (e) => setOnCallbackisCurrentUserActiveCB()
  //to just setOnCallbackisCurrentUserActiveCB in <Header ...
  const setOnCallbackisCurrentUserActiveCB = (btnState) => {
    //console.log('in isCurrentUserActive', btnState)
    //setState({isCurrentUserActive:BtnState})
    setIsCurrentUserActive(btnState);
  }

  //count is in GlobalRankingViewBtn. This code uses
  //setnewrankIdCB param in <Main below
  //NB: where you DON'T want (e) => in the property attribute:
  const setnewrankIdCB = (count) => {
    //console.log('count in app.js', count);
    setnewrankId(count);
    _loadsetJSONData(count, _loadsetJSONData_callback);
  }


  const setcontactNoCB = (number) => {
    //console.log('count in app.js', count);
    setcontactno(number);
}

const setemailCB = (oppoEmailTxt) => {
  //console.log('count in app.js', count);
  setemail(oppoEmailTxt);
}
  //#endregion

  //#region Helper methods

  //REVIEW: Possible to getUserRank in App.js (and set state) rather than Home.js?
  //currently no - problem is waiting for username to check against rank

  /**
   * Sets the App state error and redirects the user to the error page
   *
   * @param {Error} err - error encountered
   */
  const _onError = (err, source) => {
    if (source) err.source = source;
    //setState({ error: err });
    setError(err);
    props.history.push('/whoopsie');
  }
  //#endregion
  //any change with setState here will re-render app.js
  const processStateAfter_loadCurrentUserAccounts = (state) => {
    //console.log('state.user', (state).user);
    //console.log('state stringify', JSON.stringify(state))
    if (state.user !== undefined) {
      //setState({
      //error: state.error,
      setError(state.error);
      //userAccounts: state.userAccounts,
      setuserAccounts(state.userAccounts)
      //rankingDefault: state.rankingDefault,
      //isUserInJson: JSONops.isPlayerListedInJSON(state.data, state.user.username),
      //isCurrentUserActive: JSONops._getUserValue(state.data, state.user.username, "ACTIVE"),
      //newrankId: state.newrankId,
      setnewrankId(state.newrankId);
      //user: state.user,
      setuser(state.user);
      //contactno: state.user.contactno,
      setcontactno(state.user.contactno);
      //email: state.user.email,
      setemail(state.user.email);
      //description: state.user.description,
      setdescription(state.user.description);
      //account: web3.eth.defaultAccount,
      //account: state.account,
      //console.log('state.account', state.account);
      setAccount(state.account);
      //balance: state.balance,
      setBalance(state.balance);
      //rank: JSONops._getUserValue(state.data, state.user.username, "RANK"),
      //contactNoCB: state.contactNoCB,
      //setcontactNoCB(state.contactNoCB);
      setcontactno(state.contactno)
      //emailCB: state.emailCB,
      setemail(state.email);
      //loadingAccounts: false,
      //not currently used:
      //setisLoadingAccounts(false);
      //newrankId must be cleared so a new one has to be regenerated for each account
      //viewingOnlyCB: true
      setviewingOnlyCB(true);
      //  })
      //console.log('state.user.username in app.js', state.user.username)
    }
  }

  //#region React lifecycle events
  useEffect(() => {
    setIsLoading(true);
    //console.log('inside useEffect', newrankId)
    async function fetchData() {
      //const response = await MyAPI.getData(someId);

      //from the Blockchain via web3io:
      //setupdatedExtAcctBalCB(await _loadExternalBalance())
      await _loadExternalBalance(_loadExternalBalance_callback);
      //await setIsLoadingExtBal();
      //from jsonbin api via jsonio::
      await getDefaultRankingList(rankingDefault, getDefaultRankingList_callback);
      async function getDefaultRankingList_callback(json) {
        setrankingListData(json);
      }
      //from the Blockchain via web3io:
      //processStateAfter_loadCurrentUserAccounts(await _loadCurrentUserAccounts());
      processStateAfter_loadCurrentUserAccounts(
        await _mapCurrentUserAccounts(await getCurrentUserAccountsFromBlockchain()));
      await setIsLoading(false);
    }
    fetchData();
  }, []); // Or [someId] (sent as a param to a function) if effect needs props or state (apparently)

  //from https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41
  if (!isLoading) {
    //console.log('account in render', account)
    return ( <
      div >
      <
      Header data-testid = 'header'
      user = {
        user
      }
      account = {
        account
      }
      userAccounts = {
        userAccounts
      }
      balance = {
        balance
      }
      error = {
        error
      }
      isCurrentUserActive = {
        isCurrentUserActive
      }
      isCurrentUserActiveCB = {
        isCurrentUserActiveCB
      }
      setOnCallbackisCurrentUserActiveCB = {
        setOnCallbackisCurrentUserActiveCB
      }
      onChildClick = {
        handleChildClick
      }
      onListAllChildClick = {
        handleListAllChildClick
      }
      specificRankingOptionBtns = {
        specificRankingOptionBtns
      }
      onAfterUserUpdate = {
        _mapCurrentUserAccounts
      }
      onError = {
        _onError
      }
      rankingJSONdata = {
        data
      }
      rankingListJSONdata = {
        rankingListData
      }
      updatedExtAcctBalCB = {
        updatedExtAcctBalCB
      }
      usersRankingLists = {
        userRankingLists
      }
      isUserInJson = {
        isUserInJson
      }
      rankingDefault = {
        rankingDefault
      }
      newrankId = {
        newrankId
      }
      setnewrankId = {
        setnewrankId
      }
      />

      <
      Main data-testid = 'main'
      user = {
        user
      }
      contactno = {
        contactno
      }
      setcontactNoCB = {
        setcontactNoCB
      }
      setemailCB = {
        setemailCB
      }
      description = {
        description
      }
      account = {
        account
      }
      userAccounts = {
        userAccounts
      }
      error = {
        error
      }
      onChildClick = {
        handleChildClick
      }
      specificRankingOptionBtns = {
        specificRankingOptionBtns
      }

      onAfterUserUpdate = {
        _mapCurrentUserAccounts
      }
      onError = {
        _onError
      }
      rankingJSONdata = {
        data
      }
      rankingListJSONdata = {
        rankingListData
      }
      rank = {
        rank
      }
      isCurrentUserActive = {
        isCurrentUserActive
      }
      isRankingIDInvalid = {
        isRankingIDInvalid
      }
      newrankId = {
        newrankId
      }
      setnewrankIdCB = {
        setnewrankIdCB
      }
      getNewRankingID = {
        getNewRankId
      }
      rankingDefault = {
        rankingDefault
      }
      viewingOnlyCB = {
        viewingOnlyCB
      }
      setviewingOnlyCB = {
        setOnCallbackviewingOnlyCB
      }
      isUserInJson = {
        isUserInJson
      }
      loadingJSON = {
        isLoadingJSON
      }
      setOnCallbackisCurrentUserActiveCB = {
        setOnCallbackisCurrentUserActiveCB
      }
      />

      <
      /div>
    );
  } else {
    return ( <
      div data-testid = 'loading' > Loading... < /div>
    );
  }
  //}
  //#endregion
}

export default withRouter(App)
