import Header from '../UI/Header'
import Main from './Main'
import React, {
  useState,
  useEffect
} from 'react';
import {
  withRouter
} from 'react-router-dom';
import JSONops from './JSONops';
import {
  _loadsetJSONData,
  getNewRankId,
  getDefaultRankingList
} from '../SideEffects/io/Jsonio';
import {
  _loadExternalBalance
  //,
  // _mapCurrentUserAccounts,
  // mapTheAccounts
} from '../SideEffects/io/web3io';
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
import ChangeState from './ChangeState';

/**
 * Functional component representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 *
 * @extends React.Component
 */
export function App({
  props
}) {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState({});
  const [userAccounts, setuserAccounts] = useState([])
  const [balance, setBalance] = useState(0)
  const [data, setdata] = useState([])
  const [updatedExtAcctBalCB, setupdatedExtAcctBalCB] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [userRankingLists] = useState([]);
  const [isUserInJson, setIsUserInJson] = useState(false);
  const [isLoadingJSON, setisLoadingJSON] = useState(true);
  const [isCurrentUserActive, setIsCurrentUserActive] = useState(false);
  const [isCurrentUserActiveCB] = useState(false);
  const [isRankingIDInvalid] = useState(false);
  const [newrankId, setnewrankId] = useState('');
  const [rankingListData, setrankingListData] = useState([]);
  const [viewingOnlyCB, setviewingOnlyCB] = useState(true);
  const [contactno, setcontactno] = useState('');
  const [email, setemail] = useState('');
  const [description, setdescription] = useState({});
  const [specificRankingOptionBtns, setspecificRankingOptionBtns] = useState(false);
  const [rank, setrank] = useState('1');
  const [ranknameHasChanged, setranknameHasChanged] = useState(false);
  const [resultInfoForDisplay, setResultInfoForDisplay] = useState('');
  //REVIEW: set as a global var. Perhaps change to environment var ?:
  const rankingDefault = '5c36f5422c87fa27306acb52';

  function _loadExternalBalance_callback(externalbalance) {
    if (externalbalance !== undefined) {
      setupdatedExtAcctBalCB(externalbalance);
    }
  }

  //Below appears to be relevant to user events not e.g. callbacks that fetch data
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
  const setOnCallbackisCurrentUserActiveCB = (btnState) => {
    setIsCurrentUserActive(btnState);
  }
  //in GlobalRankingViewBtn
  const setnewrankIdCB = (newrankIdtxt) => {
    setnewrankId(newrankIdtxt);
    setranknameHasChanged(true);
    setIsLoading(false);
    _loadsetJSONData(newrankIdtxt, setrankingJSONdataCB);
  }
  const setResultInfoForDisplayCB = (text) => {
    console.log('setResultInfoForDisplayCB in app.js', text);
    setResultInfoForDisplay(text);
  }
  //cb from createuser.js to set the username
  //in time for getNewRankingID() to put it in the json
  const setuserNameCB = (name) => {
    setUserName(name);
    //this was originally
    //may need to account for this
    //setUser(name);
  }
  const setcontactNoCB = (number) => {
    setcontactno(number);
  }
  const setemailCB = (oppoEmailTxt) => {
    setemail(oppoEmailTxt);
  }
  const setuserDescCB = (userObj, description) => {
    userObj.description = description;
    setUser(userObj);
  }

  const setuserCB = (userObj, name, contactno, email, description) => {
    userObj.username = name;
    userObj.contactno = contactno;
    userObj.email = email;
    userObj.description = description;
    setUser(userObj);
  }

  const setrankingJSONdataCB = (datatoSet) => {
    setdata(datatoSet);
    setisLoadingJSON(false);
    setIsUserInJson(JSONops.isPlayerListedInJSON(data, user.username));
    setrank(JSONops._getUserValue(data, user.username, "RANK"));
    setIsCurrentUserActive(JSONops._getUserValue(data, user.username, "ACTIVE"));
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

  const processStateAfter_loadCurrentUserAccounts = (userAcctArr) => {
    console.log('userAcctArr before clean', userAcctArr)
    userAcctArr = ChangeState.cleanUpUserSRAccountData(userAcctArr);
    console.log('userAcctArr after clean', userAcctArr)
    if (userAcctArr) {
      setuserAccounts(userAcctArr);
      //console.log('userAcctArr[0].userAccount', userAcctArr[0])
      //REVIEW: sort out this duplication
      setAccount(userAcctArr[0]);
      setUser(userAcctArr[0])
      setError(userAcctArr[0].error);
      setUserName(userAcctArr[0].username);
      console.log(userAcctArr[0])
      if (userAcctArr[0].data !== undefined) {
        setIsUserInJson(JSONops.isPlayerListedInJSON(userAcctArr[0].data, userAcctArr[0].username));
        setIsCurrentUserActive(JSONops._getUserValue(userAcctArr[0].data, userAcctArr[0].username, "ACTIVE"));
      } else {
        setIsUserInJson(false);
      }
      setnewrankId(userAcctArr[0].newrankId);
      setcontactno(userAcctArr[0].contactno);
      setemail(userAcctArr[0].email);
      setdescription(userAcctArr[0].description);
      setBalance(userAcctArr[0].balance);
      setviewingOnlyCB(true);
    } else {
      console.log('user undefined')
    }
  }
  //#region React lifecycle events
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      //from the Blockchain via web3io:
      //await _loadExternalBalance(_loadExternalBalance_callback);

      await getDefaultRankingList(rankingDefault, getDefaultRankingList_callback);
      async function getDefaultRankingList_callback(json) {
        setrankingListData(json);
      }

      const mapTheAccounts = async (accountsArray) => {
        web3.eth.getAccounts()
        .then(function(expectingAResult){
            return expectingAResult;
        })
        .then(async function(accountsArray){
          //based on: https://flaviocopes.com/javascript-async-await-array-map/
          //get the hashes by async
          //each separate piece of async data needs these parts ...
          const functionWithPromise = item => { //a function that returns a promise
            return Promise.resolve(DSportRank.methods.owners(item).call())
          }

          const anAsyncFunction = async item => {
            return await functionWithPromise(item)
          }
          //wait for the async hash calls to resolve for all accounts
          const getData = async () => {
            return await Promise.all(accountsArray.map(item => anAsyncFunction(item)))
          }
          const data = await getData()
          //each separate piece of async data needs these parts (above)  ...

          //use the hashes to get the user data from contract by async
          const functionGetUserDataWithPromise = item => { //a function that returns a promise
            return Promise.resolve(DSportRank.methods.users(item).call());
          }

          const anAsyncFunctionToGetUserData = async item => {
            return await functionGetUserDataWithPromise(item)
          }
          //wait for the async hash calls to resolve for all users
          const getUserData = async () => {
            return await Promise.all(data.map(item => anAsyncFunctionToGetUserData(item)))
          }

          const userdata = await getUserData()
          console.log('user data in the list', userdata)

          const functionWithPromiseToGetBal = item => { //a function that returns a promise
            return Promise.resolve(web3.eth.getBalance(item.owner));
          }

          const anAsyncFunctionToGetBal = async item => {
            return await functionWithPromiseToGetBal(item)
          }
          //wait for the async hash calls to resolve for all accounts
          const getDataWithBal = async () => {
            return await Promise.all(userdata.map(item => anAsyncFunctionToGetBal(item)))
          }
          const userdataWithBal = await getDataWithBal()

          //var numbers = [4, 9, 16, 25];
          //var userdataWithBalArr = userdata.map(item => web3.eth.getBalance('0xAC5491BB066c98fec13046928a78761c0B1E5603'));
          console.log('userdataWithBal', userdataWithBal)
          return userdata;
        }).then(function(resolvedUserData){
                  processStateAfter_loadCurrentUserAccounts(resolvedUserData);
              }).catch(function(error) {
                   console.log('error is:', error)
              }).then(function() {
                   console.log('in the last then')
              });
            }
        await mapTheAccounts();

        setIsLoading(false);
    }
    fetchData();
  }, []); // Or [someId] (sent as a param to a function) if effect needs props or state (apparently)

  if (!isLoading) {
    console.log('userName', userName)
    return ( <
      div >
      <
      Header data-testid = 'header'
      user = {
        user
      }
      username = {
        userName
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
      // onAfterUserUpdate = {
      //   mapTheAccounts
      // }
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
      setuserCB = {
        setuserCB
      }
      username = {
        userName
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

      // onAfterUserUpdate = {
      //   _mapCurrentUserAccounts
      // }
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
      ranknameHasChanged = {
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
