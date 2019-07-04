import Header from '../UI/Header'
import Main from './Main'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ImgAvatar from '../../../img/avatar-default.png';
import { map } from 'async';
import JSONops from './JSONops'
import { formatEth, executingAt } from '../../utils';
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId } from '../SideEffects/io/Jsonio';
import { _loadCurrentUserAccountsInsideMapping, _loadExternalBalance, _loadCurrentUserAccounts } from '../SideEffects/io/web3io';
//import p-iteration from 'p-iteration'

//REVIEW: is the solution to this to write your own api?
//import jsonData from '../../json/Rankings.json'

//Callback functions:
//called in DoChallenge.js and used by Header.js to update the external account
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

    //cb from web3io.js to set the state of the external balance
    export function _loadExternalBalance_callback(balance) {
      //console.log('data account in callback', data[0].ACCOUNT);
      //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
       //done();
       //console.log('balance', balance)
           if(balance !== undefined){
             this.setState({ updatedExtAcctBalCB: balance })
          }
    }


    export function _loadsetJSONData_callback(data) {
      //console.log('data account in callback', data[0].ACCOUNT);
      //  expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
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

     // export function _loadsetRankingListJSONData_callback(data) {
     //   //console.log('data account in _loadsetRankingListJSONData_callback', data[0].RANKINGNAME);
     //    this.setState({
     //          rankingListData: data
     //          //loadingRankingListJSON: false
     //        })
     //  }

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
    //updatedExtAcctBalCB = updatedExtAcctBalCB.bind(this);
    contactNoCB = contactNoCB.bind(this);
    emailCB = emailCB.bind(this);
    userNameCB = userNameCB.bind(this);
    //click List All Rankings and Enter to reset the default ranking to display
    this.viewingOnlyCB = this.viewingOnlyCB.bind(this);
    _loadsetJSONData_callback = _loadsetJSONData_callback.bind(this);
    //_loadsetRankingListJSONData_callback = _loadsetRankingListJSONData_callback.bind(this);
    getNewRankId_callback = getNewRankId_callback.bind(this);
    _loadExternalBalance_callback = _loadExternalBalance_callback.bind(this);
    //_loadCurrentUserAccounts_callback = _loadCurrentUserAccounts_callback.bind(this);
    this.handleChildClick = this.handleChildClick.bind(this);
    this.handleListAllChildClick = this.handleListAllChildClick.bind(this);
    this.newrankIdCB = this.newrankIdCB.bind(this);
    this.isCurrentUserActiveCB = this.isCurrentUserActiveCB.bind(this);
    //this._loadCurrentUserAccounts_callback = this._loadCurrentUserAccounts_callback.bind(this);

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

  //#endregion

  //#region Helper methods

//REVIEW: Possible to getUserRank in App.js (and set state) rather than Home.js?
//currently no - problem is waiting for username to check against rank

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
  //any change with setState here will re-render app.js
  processStateAfter_loadCurrentUserAccounts(state){
    if(state.user !== undefined){
        this.setState({
              error: state.error,
              userAccounts: state.userAccounts,
              //rankingDefault: state.rankingDefault,
              //isUserInJson: JSONops.isPlayerListedInJSON(this.state.data, this.state.user.username),
              //isCurrentUserActive: JSONops._getUserValue(this.state.data, this.state.user.username, "ACTIVE"),
              newrankId: state.newrankId,
              user: state.user,
              contactno: state.user.contactno,
              email: state.user.email,
              description: state.user.description,
              //account: web3.eth.defaultAccount,
              account: state.account,
              balance: state.balance,
              //rank: JSONops._getUserValue(this.state.data, this.state.user.username, "RANK"),
              contactNoCB: state.contactNoCB,
              emailCB: state.emailCB,
              loadingAccounts: false,
              //newrankId must be cleared so a new one has to be regenerated for each account
              viewingOnlyCB: true
        })
        console.log('result in app.js', this.state.user.username)
      }
  }
  //#region React lifecycle events
  //loading the network functions from here
  //render() has already rendered at least once before
  // componentDidMount runs
  async componentDidMount() {
        if(this.state.newrankIdCB === ''){
            this.setState({ isLoading: true });
            try{
              _loadExternalBalance(_loadExternalBalance_callback);
              //await  _loadsetRankingListJSONData(this.state.rankingDefault, _loadsetRankingListJSONData_callback);
              this.getandSetDefaultRankingList();
              const state = await _loadCurrentUserAccounts();
              this.processStateAfter_loadCurrentUserAccounts(state);
            }catch(e){
              console.log('componentDidMount err in app', e)
            }
            this.setState({ isLoading: false });
          }
        if(this.state.user.username !== undefined){
          //uses json.i
          getNewRankId("test description", '123456', 'test@test.com', '67890', 'player1', getNewRankId_callback);
        }
  }

  async getandSetDefaultRankingList() {
    try {
      let httpStr = 'https://api.jsonbin.io/b/' + this.state.rankingDefault + '/latest';
      const response = await fetch(httpStr);
      const json = await response.json();
      this.setState({
            rankingListData: json
      });
    } catch (e) {
      this.setState({ error: e });
    } finally {

    }
  }

  render() {
    //from https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41
      if(!this.state.isLoading){
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
                onAfterUserUpdate={(e) => _loadCurrentUserAccounts()}
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
          }else{
            return (
                <div>Loading ...</div>
            );
          }
        }
  //#endregion
}

export default withRouter(App)
