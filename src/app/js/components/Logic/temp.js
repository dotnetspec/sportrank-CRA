import Header from '../UI/Header'
import Main from './Main'
import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import JSONops from './JSONops'
import {  getNewRankId, getDefaultRankingList } from '../SideEffects/io/Jsonio';
import {  _loadExternalBalance, _loadCurrentUserAccounts } from '../SideEffects/io/web3io';

/**
 * Class representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 *
 * @extends React.Component
 */
//class App extends Component {
  export function App(props){

    function currentUserRankCB(currentUserRank) {
        //setState({currentUserRank})
        setCurrentUserRank(currentUserRank);
    }
    //cb from web3io.js to set the state of the external balance
    function _loadExternalBalance_callback(balance) {
           if(balance !== undefined){
             setBalance(balance);
          }
    }
    function _loadsetJSONData_callback(data) {
      setdata(data);
      setisLoadingJSON(false);
      setIsUserInJson(JSONops.isPlayerListedInJSON(data, user.username));
      setrank(JSONops._getUserValue(data, user.username, "RANK"));
      setIsCurrentUserActive(JSONops._getUserValue(data, user.username, "ACTIVE"));

     }
      function getNewRankId_callback(data){
        setnewrankId(data.id);
        setranknameHasChanged(true);
        setIsLoading(false);
      }

      function _loadCurrentUserAccountsInsideMapping_callback(data){
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
  const [currentUserRank, setCurrentUserRank] = useState(0)
  //     updatedExtAcctBalCB: 0,
  const [updatedExtAcctBalCB, setupdatedExtAcctBalCB] = useState(0)
  //     isLoading: true,
  const [isLoading, setIsLoading] = useState(true)
  //     contactNoCB:'',
  const [contactNoCB, setcontactNoCB] = useState('')
  //     emailCB:'',
  const [emailCB, setemailCB] = useState('')
  //     usersRankingLists: [],
  const [userRankingLists, setuserRankingLists] = useState([]);
  //     isUserInJson: false,
  const [isUserInJson, setIsUserInJson] = useState(false);
  //     jsonHasRankingID: false,
  const [jsonHasRankingID, setjsonHasRankingID] = useState(false);;
  //     jsonHasData: false,
  const [jsonHasData, setjsonHasData] = useState(false);
  //     loadingAccounts: true,
  const [isLoadingAccounts, setisLoadingAccounts] = useState(true);
  //     loadingJSON: true,
  const [isLoadingJSON, setisLoadingJSON] = useState(true);
  //     loadingExtBal: true,
  const [isLoadingExtBal, setIsLoadingExtBal] = useState(true);
  //     isCurrentUserActive: false,
  const [isCurrentUserActive, setIsCurrentUserActive] = useState(false);
  const [isCurrentUserActiveCB, setIsCurrentUserActiveCB] = useState(false);
  //     isRankingIDInvalid: false,
  const [isRankingIDInvalid, setisRankingIDInvalid] = useState(false);
  //     newrankId: '',
  const [newrankId, setnewrankId] = useState('');
  //     //rankingDefault is the global ranking list json
  //     rankingDefault: '5c36f5422c87fa27306acb52',
  const [rankingDefault, setrankingDefault] = useState('5c36f5422c87fa27306acb52');
  //     userNameCB: '',
  const [userNameCB, setuserNameCB] = useState('');
  //     loadingRankingListJSON: true,
  const [isLoadingRankingListJSON, setisLoadingRankingListJSON] = useState(true);
  //     rankingListData: [],
  const [rankingListData, setrankingListData] = useState([]);
  //     newrankIdCB:'',
  const [newrankIdCB, setnewrankIdCB] = useState('');
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
   const setOnCallbackviewingOnlyCB = (viewingOnlyCB) => {
     // console.log('in viewingOnlyCB', viewingOnlyCB)
     //   setState({viewingOnlyCB:viewingOnlyCB})
       setviewingOnlyCB(viewingOnlyCB);
   }

   //cb from PlayerStatusBtn.js to set the state of the button
   const setOnCallbackisCurrentUserActiveCB = (BtnState) => {
     console.log('in isCurrentUserActive', BtnState)
       //setState({isCurrentUserActive:BtnState})
       setIsCurrentUserActiveCB(BtnState);
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
    if(state.user !== undefined){
        //setState({
              //error: state.error,
              setError(state.error);
              //userAccounts: state.userAccounts,
              setuserAccounts(state.userAccounts)
              //rankingDefault: state.rankingDefault,
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
              setAccount(state.account);
              //balance: state.balance,
              setBalance(state.balance);
              //rank: JSONops._getUserValue(state.data, state.user.username, "RANK"),
              //contactNoCB: state.contactNoCB,
              setcontactNoCB(state.contactNoCB);
              //emailCB: state.emailCB,
              setemailCB(state.emailCB);
              //loadingAccounts: false,
              setisLoadingAccounts(false);
              //newrankId must be cleared so a new one has to be regenerated for each account
              //viewingOnlyCB: true
              setviewingOnlyCB(true);
      //  })
        console.log('result in app.js', user.username)
      }
  }
  //#region React lifecycle events
  useEffect(() => {
    async function fetchData() {
      //const response = await MyAPI.getData(someId);
     setIsLoading(true);
     //from the Blockchain via web3io:
     setupdatedExtAcctBalCB(await _loadExternalBalance())
     //await setIsLoadingExtBal();
     //from jsonbin api via jsonio::
     await getDefaultRankingList(rankingDefault, getDefaultRankingList_callback);
     async function getDefaultRankingList_callback(json){
       setrankingListData(json);
      }
     //from the Blockchain via web3io:
     processStateAfter_loadCurrentUserAccounts(await _loadCurrentUserAccounts());
     await setIsLoading(false);
    }
    fetchData();
  }, []); // Or [someId] (sent as a param to a function) if effect needs props or state (apparently)

  // render() {
  //   //from https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41
       if(!isLoading){
          return (
            <div>
              <Header
                data-testid='header'
                user={user}
                account={account}
                userAccounts={userAccounts}
                balance={balance}
                error={error}
                isCurrentUserActive={isCurrentUserActive}
                isCurrentUserActiveCB={(e) => isCurrentUserActiveCB()}
                onChildClick={(e) => handleChildClick()}
                onListAllChildClick={(e) => handleListAllChildClick()}
                specificRankingOptionBtns={specificRankingOptionBtns}
                onAfterUserUpdate={(e) => _loadCurrentUserAccounts()}
                onError={(err, source) => _onError(err, source)}
                rankingJSONdata={data}
                rankingListJSONdata={rankingListData}
                updatedExtAcctBalCB={updatedExtAcctBalCB}
                usersRankingLists={userRankingLists}
                isUserInJson={isUserInJson}
                rankingDefault={rankingDefault}
                newrankId={newrankId}
                newrankIdCB={newrankIdCB}
                />

              <Main
                data-testid='main'
                user={user}
                contactno={contactno}
                email={email}
                description={description}
                account={account}
                userAccounts={userAccounts}
                error={error}
                onChildClick={(e) => handleChildClick()}
                specificRankingOptionBtns={specificRankingOptionBtns}
                onAfterUserUpdate={(e) => _loadCurrentUserAccounts()}
                onError={(err, source) => _onError(err, source)}
                rankingJSONdata={data}
                rankingListJSONdata={rankingListData}
                contactNoCB={(e) => setcontactNoCB()}
                emailCB={emailCB}
                rank={rank}
                isCurrentUserActive={isCurrentUserActive}
                isRankingIDInvalid={isRankingIDInvalid}
                newrankId={newrankId}
                rankingDefault={rankingDefault}
                getNewRankingID={(e) => getNewRankId()}
                newrankIdCB={newrankIdCB}
                viewingOnlyCB={viewingOnlyCB}
                isUserInJson={isUserInJson}
                loadingJSON={isLoadingJSON}
                />

                </div>
            );
          }else{
            return (
                <div data-testid='loading'>Loading ...</div>
            );
          }
        //}
  //#endregion
}

export default withRouter(App)
