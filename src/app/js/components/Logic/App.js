import Header from '../UI/Header'
import Main from './Main'
import React, {
  //Component,
  useState,
  useEffect,
  //useCallback,
  //useReducer
} from 'react';
import {
  withRouter
} from 'react-router-dom'
//import ImgAvatar from '../../../img/avatar-default.png';
// import {
//   map
// } from 'async';
import JSONops from './JSONops'
// import {
//   formatEth,
//   executingAt
// } from '../../utils';
//import {enableEthereum} from '../../../../web3';
//import DSportRank from '../../../../ABIaddress';
import {
  _loadsetJSONData,
//  _loadsetRankingListJSONData,
  getNewRankId,
  getDefaultRankingList
} from '../SideEffects/io/Jsonio';
import {
  //_loadCurrentUserAccountsInsideMapping,
  _loadExternalBalance,
  _mapCurrentUserAccounts,
  //getCurrentUserAccountsFromBlockchain
} from '../SideEffects/io/web3io';
//import DSportRank from '../../../../ABIaddress';
//import axios from 'axios'
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
//functional component App extends Component {
export function App({
  props
}) {

  const [user, setuser] = useState({});
  const [account, setAccount] = useState('');
  const [error, setError] = useState({});
  const [userAccounts, setuserAccounts] = useState([])
  const [balance, setBalance] = useState(0)
  const [data, setdata] = useState([])
  const [updatedExtAcctBalCB, setupdatedExtAcctBalCB] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [userRankingLists] = useState([]);
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
  //const [rankingDefault] = useState('5c36f5422c87fa27306acb52');
  //     userNameCB: '',
  //const [userNameCB, setuserNameCB] = useState('');
  //     loadingRankingListJSON: true,
  //const [isLoadingRankingListJSON, setisLoadingRankingListJSON] = useState(true);
  //     rankingListData: [],
  const [rankingListData, setrankingListData] = useState([]);
  const [viewingOnlyCB, setviewingOnlyCB] = useState(true);
  const [contactno, setcontactno] = useState('');
  const [email, setemail] = useState('');
  const [description, setdescription] = useState({});
  const [specificRankingOptionBtns, setspecificRankingOptionBtns] = useState(false);
  const [rank, setrank] = useState('1');
  const [
    ranknameHasChanged,
    setranknameHasChanged] = useState(false);
  //const [address, setaddress] = useState('');
  const [resultInfoForDisplay, setResultInfoForDisplay] = useState('');
  //set as a global var:
  const rankingDefault = '5c36f5422c87fa27306acb52';

  // const result = await enableEthereum();
  // console.log('result', result);

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

  //cb from web3io.js to set the state of the external balance
  function _loadExternalBalance_callback(externalbalance) {
    if (externalbalance !== undefined) {
      setupdatedExtAcctBalCB(externalbalance);
    }
  }

  function _loadsetJSONData_callback(data) {
    console.log('data account in _loadsetJSONData_callback in app.js', data[0].ACCOUNT);
    //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
    setdata(data);
    setisLoadingJSON(false);
    setIsUserInJson(JSONops.isPlayerListedInJSON(data, user.username));
    setrank(JSONops._getUserValue(data, user.username, "RANK"));
    setIsCurrentUserActive(JSONops._getUserValue(data, user.username, "ACTIVE"));
  }

  // function getNewRankId_callback(data) {
  //   //setState({ newrankId: data.id});
  //   setnewrankId(data.id);
  //   //setState({ ranknameHasChanged: true});
  //   setranknameHasChanged(true);
  //   //setState({ isLoading: false});
  //   setIsLoading(false);
  // }

  // function _loadCurrentUserAccountsInsideMapping_callback(data) {
  //   //setState({ address: data.address});
  //   setaddress(data.address);
  //   //setState({ user: data.user});
  //   setuser(data.user);
  //   //setState({ balance: data.balance});
  //   setBalance(data.balance)
  // }

  //Below appears to be relevant to user events not e.g. callbacks that fetch data
  //display the ranking specific btn options
  const setspecificRankingOptionBtnsCB = () => {
    setspecificRankingOptionBtns(true);
  }

  const handleListAllChildClick = () => {
    setspecificRankingOptionBtns(false);
  }

  //cb from GlobalRankings.js to set the rank state as view only
  //REVEIW: is this necessary? wasn't working until noticed it ...
  const setOnCallbackviewingOnlyCB = (viewingOnlyCBval) => {
    setviewingOnlyCB(viewingOnlyCBval);
  }

  //cb from PlayerStatusBtn.js to set the state of the button
  //from (e) => setOnCallbackisCurrentUserActiveCB()
  //to just setOnCallbackisCurrentUserActiveCB in <Header ...
  const setOnCallbackisCurrentUserActiveCB = (btnState) => {
    //console.log('in isCurrentUserActive', btnState)
    setIsCurrentUserActive(btnState);
  }
  //count is in GlobalRankingViewBtn. This code uses
  //setnewrankIdCB param in <Main below
  //NB: where you DON'T want (e) => in the property attribute:
  const setnewrankIdCB = (newrankIdtxt) => {
    setnewrankId(newrankIdtxt);
    setranknameHasChanged(true);
    setIsLoading(false);
    _loadsetJSONData(newrankIdtxt, _loadsetJSONData_callback);
  }

  const setResultInfoForDisplayCB = (text) => {
    console.log('setResultInfoForDisplayCB in app.js', text);
    setResultInfoForDisplay(text);
  }
  //cb from createuser.js to set the username
  //in time for getNewRankingID() to put it in the json
  const setuserNameCB = (name) => {
    console.log('name in app.js', name);
    setuser(name);
}

  const setcontactNoCB = (number) => {
    setcontactno(number);
}

const setemailCB = (oppoEmailTxt) => {
  setemail(oppoEmailTxt);
}

const setuserDescCB = (userObj, description) => {
  console.log('userObj', userObj)
  userObj.description = description;
  console.log('setuserDescCB txt', userObj.description)
  //setdescription(userObj);
  setuser(userObj);
}

//just repeating _loadsetJSONData_callback?
const setrankingJSONdataCB = (datatoSet) => {
  console.log('datatoSet', datatoSet)
  setdata(datatoSet);
  // setisLoadingJSON(false);
  // setIsUserInJson(JSONops.isPlayerListedInJSON(data, user.username));
  // setrank(JSONops._getUserValue(data, user.username, "RANK"));
  // setIsCurrentUserActive(JSONops._getUserValue(data, user.username, "ACTIVE"));
}
  //#endregion
  //#region Helper methods
  //REVIEW: Possible to getUserRank in App.js (and set state) rather than Home.js?
  //currently no - problem is waiting for username to check against ran
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

  const processStateAfter_loadCurrentUserAccounts = (state) => {
    setuserAccounts(state.userAccounts);
    setuser(state.userAccounts[0].user);
    if (state.userAccounts[0].user !== undefined) {
      setError(state.error);
      setuserAccounts(state.userAccounts)
      if(state.data !== undefined){
        setIsUserInJson(JSONops.isPlayerListedInJSON(state.data, state.user.username));
        setIsCurrentUserActive(JSONops._getUserValue(state.data, state.user.username, "ACTIVE"));
      }else{
        setIsUserInJson(false);
      }
      setnewrankId(state.newrankId);
      setcontactno(state.userAccounts[0].user.contactno);
      setemail(state.userAccounts[0].user.email);
      setdescription(state.userAccounts[0].user.description);
      setAccount(state.account);
      setBalance(state.balance);
      setviewingOnlyCB(true);
    }else{
      console.log('user undefined')
    }
  }

  //#region React lifecycle events
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      //from the Blockchain via web3io:
      await _loadExternalBalance(_loadExternalBalance_callback);

      await getDefaultRankingList(rankingDefault, getDefaultRankingList_callback);
      async function getDefaultRankingList_callback(json) {
        setrankingListData(json);
      }
      const state = await _mapCurrentUserAccounts();
      processStateAfter_loadCurrentUserAccounts(state);
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
      description = {
        description
      }
      setuserDescCB = {
        setuserDescCB
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
      setspecificRankingOptionBtnsCB = {
        setspecificRankingOptionBtnsCB
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
      resultInfoForDisplay = {
        resultInfoForDisplay
      }
      setResultInfoForDisplayCB = {
        setResultInfoForDisplayCB
      }
      />

      <
      Main data-testid = 'main'
      user = {
        user
      }
      setuserNameCB = {
        setuserNameCB
      }
      contactno = {
        contactno
      }
      setcontactNoCB = {
        setcontactNoCB
      }
      email = {
        email
      }
      setemailCB = {
        setemailCB
      }
      description = {
        description
      }
      setuserDescCB = {
        setuserDescCB
      }
      resultInfoForDisplay = {
        resultInfoForDisplay
      }
      setResultInfoForDisplayCB = {
        setResultInfoForDisplayCB
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
      setspecificRankingOptionBtnsCB = {
        setspecificRankingOptionBtnsCB
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
      setrankingJSONdataCB = {
        setrankingJSONdataCB
      }
      rankingListJSONdata = {
        rankingListData
      }
      rank = {
        rank
      }
      ranknameHasChanged={
        ranknameHasChanged
      }
      isCurrentUserActive = {
        isCurrentUserActive
      }
      setOnCallbackisCurrentUserActiveCB = {
        setOnCallbackisCurrentUserActiveCB
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
