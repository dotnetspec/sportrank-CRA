import Header from "../UI/Header";
import Main from "./Main";
import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import JSONops from "./JSONops";
import {
  _loadsetJSONData,
  getNewRankId,
  getDefaultRankingList
} from "../SideEffects/io/Jsonio";
import {
  _loadExternalBalance
  //,
  // _mapCurrentUserAccounts,
  // mapTheAccounts
} from "../SideEffects/io/web3io";
import web3 from "../../../../web3";
import DSportRank from "../../../../ABIaddress";
import ChangeState from "./ChangeState";
import {formatEth} from "../../utils";

/**
 * Functional component representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 *
 * @extends React.Component
 */
export function App({props}) {
  const [user, setUser] = useState({});
  const [description, setdescription] = useState({});
  const [selectedOpponentDetails, setselectedOpponentDetails] = useState({});
  const [account, setAccount] = useState({});
  const [error, setError] = useState({});
  const [userAccounts, setuserAccounts] = useState([]);
  const [data, setdata] = useState([]);
  const [userRankingLists] = useState([]);
  const [rankingListData, setrankingListData] = useState([]);
  const [ranknameHasChanged, setranknameHasChanged] = useState(false);
  const [specificRankingOptionBtns, setspecificRankingOptionBtns] = useState(
    false
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUserInJson, setIsUserInJson] = useState(false);
  const [isLoadingJSON, setisLoadingJSON] = useState(true);
  const [isCurrentUserActive, setIsCurrentUserActive] = useState(false);
  const [isCurrentUserActiveCB] = useState(false);
  const [isRankingIDInvalid] = useState(false);
  const [viewingOnlyCB, setviewingOnlyCB] = useState(true);
  const [userName, setUserName] = useState("");
  const [contactno, setcontactno] = useState("");
  const [email, setemail] = useState("");
  const [newrankId, setnewrankId] = useState("");
  const [resultInfoForDisplay, setResultInfoForDisplay] = useState("");
  const [rank, setrank] = useState("1");
  const [updatedExtAcctBalCB, setupdatedExtAcctBalCB] = useState(0);
  const [balance, setBalance] = useState(0);

  //REVIEW: set as a global var. Perhaps change to environment var ?:
  const rankingDefault = "5c36f5422c87fa27306acb52";
  //cb from DoChallenge.js once an opponent has been selected
  const updateOpponentDetailsCB = opponent => {
    setselectedOpponentDetails(opponent.name);
    setselectedOpponentDetails(opponent.contactno);
    setselectedOpponentDetails(opponent.email);
  };

  function _loadExternalBalance_callback(externalbalance) {
    if (externalbalance !== undefined) {
      setupdatedExtAcctBalCB(externalbalance);
    }
  }

  //Below appears to be relevant to user events not e.g. callbacks that fetch data
  const setspecificRankingOptionBtnsCB = bool => {
    console.log("in setspecificRankingOptionBtns");
    setspecificRankingOptionBtns(bool);
  };
  const handleListAllChildClick = () => {
    setspecificRankingOptionBtns(false);
  };
  //cb from GlobalRankings.js to set the rank state as view only
  //REVEIW: is this necessary? wasn't working until noticed it ...
  const setOnCallbackviewingOnlyCB = viewingOnlyCBval => {
    setviewingOnlyCB(viewingOnlyCBval);
  };
  //cb from PlayerStatusBtn.js to set the state of the button
  const setOnCallbackisCurrentUserActiveCB = btnState => {
    setIsCurrentUserActive(btnState);
  };
  //in GlobalRankingViewBtn
  const setnewrankIdCB = newrankIdtxt => {
    setnewrankId(newrankIdtxt);
    setranknameHasChanged(true);
    setIsLoading(false);
    _loadsetJSONData(newrankIdtxt, setrankingJSONdataCB);
  };
  const setResultInfoForDisplayCB = text => {
    setResultInfoForDisplay(text);
  };
  //cb from createuser.js to set the username
  //in time for getNewRankingID() to put it in the json
  const setuserNameCB = name => {
    setUserName(name);
  };
  const setcontactNoCB = number => {
    setcontactno(number);
  };
  const setemailCB = oppoEmailTxt => {
    setemail(oppoEmailTxt);
  };
  const setuserDescCB = (userObj, description) => {
    userObj.description = description;
    setUser(userObj);
  };

  const setuserCB = (userObj, name, contactno, email, description) => {
    userObj.username = name;
    userObj.contactno = contactno;
    userObj.email = email;
    userObj.description = description;
    setUser(userObj);
  };

  const setrankingJSONdataCB = datatoSet => {
    setdata(datatoSet);
    setisLoadingJSON(false);
    setIsUserInJson(JSONops.isPlayerListedInJSON(data, userName));
    setrank(JSONops._getUserValue(data, userName, "RANK"));
    setIsCurrentUserActive(JSONops._getUserValue(data, userName, "ACTIVE"));
  };
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
    setError(err);
    props.history.push("/whoopsie");
  };
  //#endregion

  const processStateAfter_loadCurrentUserAccounts = userAcctArr => {
    userAcctArr = ChangeState.cleanUpUserSRAccountData(userAcctArr);
    //console.log('userAcctArr after clean', userAcctArr)
    if (userAcctArr) {
      setuserAccounts(userAcctArr);
      //REVIEW: sort out this duplication
      setAccount(userAcctArr[0]);
      setUser(userAcctArr[0]);
      setError(userAcctArr[0].error);
      setUserName(userAcctArr[0].username);
      if (userAcctArr[0].data !== undefined) {
        setIsUserInJson(
          JSONops.isPlayerListedInJSON(
            userAcctArr[0].data,
            userAcctArr[0].username
          )
        );
        setIsCurrentUserActive(
          JSONops._getUserValue(
            userAcctArr[0].data,
            userAcctArr[0].username,
            "ACTIVE"
          )
        );
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
      console.log("user undefined");
    }
  };
  //#region React lifecycle events
  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, []); // Or [someId] (sent as a param to a function) if effect needs props or state (apparently)

  //async function fetchData() {
  const fetchData = async () => {
    //from the Blockchain via web3io:
    await _loadExternalBalance(_loadExternalBalance_callback);

    await getDefaultRankingList(rankingDefault, getDefaultRankingList_callback);
    async function getDefaultRankingList_callback(json) {
      setrankingListData(json);
    }

    const mapTheAccounts = async accountsArray => {
      web3.eth
        .getAccounts()
        .then(function(expectingAResult) {
          return expectingAResult;
        })
        .then(async function(accountsArray) {
          //based on: https://flaviocopes.com/javascript-async-await-array-map/
          //get the hashes by async
          //each separate piece of async data needs these parts ...
          const functionWithPromise = item => {
            //a function that returns a promise
            return Promise.resolve(DSportRank.methods.owners(item).call());
          };

          const anAsyncFunction = async item => {
            return await functionWithPromise(item);
          };
          //wait for the async hash calls to resolve for all accounts
          const getData = async () => {
            return await Promise.all(
              accountsArray.map(item => anAsyncFunction(item))
            );
          };
          const data = await getData();
          //each separate piece of async data needs these parts (above)  ...

          //use the hashes to get the user data from contract by async
          const functionGetUserDataWithPromise = item => {
            //a function that returns a promise
            return Promise.resolve(DSportRank.methods.users(item).call());
          };

          const anAsyncFunctionToGetUserData = async item => {
            return await functionGetUserDataWithPromise(item);
          };
          //wait for the async hash calls to resolve for all users
          const getUserData = async () => {
            return await Promise.all(
              data.map(item => anAsyncFunctionToGetUserData(item))
            );
          };

          const userdata = await getUserData();
          //console.log('user data in the list', userdata)

          const functionWithPromiseToGetBal = item => {
            //a function that returns a promise
            return Promise.resolve(web3.eth.getBalance(item.owner));
          };

          const anAsyncFunctionToGetBal = async item => {
            return await functionWithPromiseToGetBal(item);
          };
          //wait for the async hash calls to resolve for all accounts
          //and get the balances ...
          const getBalances = async () => {
            return await Promise.all(
              userdata.map(item => anAsyncFunctionToGetBal(item))
            );
          };
          const balances = await getBalances();
          //NB: the mapping here affects getUserData() I think because it
          //finishes before getUserData and therefore that array already has
          //formatted balances from here:
          userdata.map(addBalToUsers);

          function addBalToUsers(item, index) {
            let balAsEth = web3.utils.fromWei(balances[index], "ether");
            balAsEth = formatEth(balAsEth, 3);
            const newItem = (item.balance = balAsEth);
            return newItem;
          }
          //originally appeared that would have to create a new array
          //with the balances mapped ... but this was unnecessary ...
          return userdata;
          //return usersWithBal;
        })
        .then(function(resolvedUserData) {
          processStateAfter_loadCurrentUserAccounts(resolvedUserData);
          setIsLoading(false);
        })
        .catch(function(error) {
          console.log("error is:", error);
        })
        .then(function() {});
    };
    await mapTheAccounts();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async function() {
        // Time to reload your interface with accounts[0]!
        await mapTheAccounts();
      });
    }
    setIsLoading(false);
  };

  if (!isLoading) {
    return (
      <div>
        <Header
          data-testid="header"
          user={user}
          setuserCB={setuserCB}
          username={userName}
          setuserNameCB={setuserNameCB}
          account={account}
          description={description}
          setuserDescCB={setuserDescCB}
          userAccounts={userAccounts}
          balance={balance}
          error={error}
          isCurrentUserActive={isCurrentUserActive}
          isCurrentUserActiveCB={isCurrentUserActiveCB}
          setOnCallbackisCurrentUserActiveCB={
            setOnCallbackisCurrentUserActiveCB
          }
          setspecificRankingOptionBtnsCB={setspecificRankingOptionBtnsCB}
          onListAllChildClick={handleListAllChildClick}
          specificRankingOptionBtns={specificRankingOptionBtns}
          // onAfterUserUpdate = {
          //   setuserNameCB
          // }
          onError={_onError}
          rankingJSONdata={data}
          rankingListJSONdata={rankingListData}
          updatedExtAcctBalCB={updatedExtAcctBalCB}
          usersRankingLists={userRankingLists}
          isUserInJson={isUserInJson}
          rankingDefault={rankingDefault}
          newrankId={newrankId}
          setnewrankId={setnewrankId}
          resultInfoForDisplay={resultInfoForDisplay}
          setResultInfoForDisplayCB={setResultInfoForDisplayCB}
        />

        <Main
          data-testid="main"
          user={user}
          setuserCB={setuserCB}
          username={userName}
          setuserNameCB={setuserNameCB}
          contactno={contactno}
          setcontactNoCB={setcontactNoCB}
          email={email}
          setemailCB={setemailCB}
          description={description}
          setuserDescCB={setuserDescCB}
          resultInfoForDisplay={resultInfoForDisplay}
          setResultInfoForDisplayCB={setResultInfoForDisplayCB}
          account={account}
          userAccounts={userAccounts}
          error={error}
          setspecificRankingOptionBtnsCB={setspecificRankingOptionBtnsCB}
          specificRankingOptionBtns={specificRankingOptionBtns}
          // onAfterUserUpdate = {
          //   setuserNameCB
          // }
          onError={_onError}
          rankingJSONdata={data}
          setrankingJSONdataCB={setrankingJSONdataCB}
          rankingListJSONdata={rankingListData}
          rank={rank}
          ranknameHasChanged={ranknameHasChanged}
          isCurrentUserActive={isCurrentUserActive}
          setOnCallbackisCurrentUserActiveCB={
            setOnCallbackisCurrentUserActiveCB
          }
          isRankingIDInvalid={isRankingIDInvalid}
          newrankId={newrankId}
          setnewrankIdCB={setnewrankIdCB}
          getNewRankingID={getNewRankId}
          rankingDefault={rankingDefault}
          viewingOnlyCB={viewingOnlyCB}
          setviewingOnlyCB={setOnCallbackviewingOnlyCB}
          isUserInJson={isUserInJson}
          loadingJSON={isLoadingJSON}
          updateOpponentDetailsCB={updateOpponentDetailsCB}
          selectedOpponentDetails={selectedOpponentDetails}
        />
      </div>
    );
  } else {
    return <div data-testid="loading"> Loading... </div>;
  }
}

export default withRouter(App);
