import React, {
  Component, useState, useEffect
} from 'react';
//import { Grid, Row, Col, PageHeader, Button, Image, Modal, Navbar, ButtonToolbar, Dropdown, Glyphicon, MenuItem, Overlay, Tooltip } from 'react-bootstrap';
import {
  Grid,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';

import '../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
//import { Row, Col, Button, Image, Modal, Navbar, ButtonToolbar, Dropdown, Glyphicon, DropdownItem, Overlay, Tooltip } from 'react-bootstrap';
//import { TableHeaderColumn } from 'react-bootstrap-table';
//import { NavLink, withRouter } from 'react-router-dom'
import Spinner from 'react-spinkit';
//import Chance from "chance"
import DoChallenge from './DoChallenge'
import EnterResult from './EnterResult'
import JSONops from './JSONops'
import _sendJSONDataWithRankingID from '../SideEffects/io/Jsonio'
//import Grid from 'react-bootstrap/Grid'
//import PageHeader from 'react-bootstrap/PageHeader'

//REVIEW: May be able to improve setting rank with similar to:
//setState((state, props) => ({
//   counter: state.counter + props.increment
// }));
//i.e. setting state by passing a function
//https://reactjs.org/docs/state-and-lifecycle.html

/**
 * Functionality representing the table search properties
 */
//REVIEW: selectRowPropAfterClickRow had to be created separately from selectRowProp to handle the row data
//after selecting a row
const selectRowPropAfterClickRow = {
  selectedOpponentName: '',
  selected: [],
  selectedOpponentRank: ''
};

//REIVEW: potentially used as selector for the table,
//but currenlty unused
// const qualityType = {
//   0: 'AVAILABLE',
//   1: 'player'
// };

//REIVEW: potentially used as selector for the table,
//but currenlty unused
// function enumFormatter(cell, row, enumObject) {
//   console.log(enumObject[cell])
//   return enumObject[cell];
// }
//#endregion


//NB: this function gets called from sibling Header.js
//to clear the warning text when user changes account
//based on info from
//https://www.codeproject.com/Tips/1215984/Update-State-of-a-Component-from-Another-in-React
// export function updateWarningText(warningText) {
//   console.log('warningText', warningText)
//   //if(warningText)
//   setState({
//     warningText
//   })
// }

/**
 * Class representing the home page rendering
 * Important functions:
 * preprocessDataBeforeRender() e.g. handles if user doesn't exist yet etc.
 *
 * @extends React.Component
 */
//class Home extends Component {
  export default function Home(props){

  //#region Constructor
  // constructor(props, context) {
  //   super(props, context);
  //   state = {

      const [showModal, setshowModal] = useState(false)
      const [resultModalIsOpen, setResultModalIsOpen] = useState(false)
      const [warningModalIsOpen, setWarningModalIsOpen] = useState(false)
      const [warningText, setWarningText] = useState('')
      const [rank, setRank] = useState(0)
      //const [contactNoCB, setcontactNoCB] = useState('')
      const [emailCB, setEmailCB] = useState('')
      const [data, setData] = useState('')
      const [resultInfoForDisplay, setResultInfoForDisplay] = useState('')
    //}

    const tablesortoptions = {
      defaultSortName: 'RANK', // default sort column name
      defaultSortOrder: 'asc' // default sort order
    };


    const setResultModalIsOpenCB = (openOrCloseBool) => {
      console.log('setResultModalIsOpenCB', openOrCloseBool)
      setResultModalIsOpen(openOrCloseBool);
      // setState({
      //   showModal: false
      // });
    }

    // const {
    //   rankingDefault
    // } = props;
    // console.log('rankingDefault in home', rankingDefault)
    //bind the callbacks (defined above) to this parent component Home
    //so that DoChallenge (and EnterResult?) changes are updated in UI:
    //REVIEW: Probably not necessary ...
    //updateWarningText = updateWarningText.bind(this);
    //closeResultModal = closeResultModal.bind(this);
  //}
  //#endregion

  /**
   * Hides the challenge modal
   */
  const _handleClose = () => {
    console.log('_handleClose')
    setshowModal(false);
    // setState({
    //   showModal: false
    // });
  }

  // updateWarningText(warningText) {
  //   console.log('updateWarningText', warningText)
  //   setState({
  //     warningText: warningText
  //   });
  // }
  const updateWarningText = (warningText) => {
      setWarningText(warningText);
       //setState({warningText: warningText});
   }
  /**
   * Shows the challenge modal
   */
  const _handleShowChallengeModal = () => {
    //clear the warning text initially:
    setWarningText('');
    // setState({
    //   warningText: ''
    // });
    const {
      rankingJSONdata
    } = props;
    if (selectRowPropAfterClickRow.selectedOpponentName === props.user.username) {
      setWarningText(' You cannot challenge yourself!');
      // setState({
      //   warningText: ' You cannot challenge yourself!'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   warningModalIsOpen: true
      // });
    } else if (!JSONops.isPlayerLowerRankThanChallengeOpponent(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' This opponent is lower than you in the rankings - aim high!');
      // setState({
      //   warningText: ' This opponent is lower than you in the rankings - aim high!'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   warningModalIsOpen: true
      // });
    } else if (JSONops.isPlayerAlreadyChallengingThisOpp(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' You are already challenging this player!')
      // setState({
      //   warningText: ' You are already challenging this player!'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   warningModalIsOpen: true
      // });
    } else if (!JSONops.isPlayerAvailableToChallenge(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' Please allow ongoing challenge(s) to complete ...')
      // setState({
      //   warningText: ' Please allow ongoing challenge(s) to complete ...'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   warningModalIsOpen: true
      // });
    } else {
      setshowModal(true);
      // setState({
      //   showModal: true
      // });
      setWarningText('');
      // setState({
      //   warningText: ''
      // });
    }
  }

  //TODO: use https://reactjs.org/docs/faq-state.html
  //and code below for better setting of rank in state (perhaps?)
  // setStateOfRank() {
  //   setState((state) => {
  //     // Important: read `state` instead of `state` when updating.
  //     return {rank: state.count + 1}
  //   });
  // }

  const onClickChallengeSelected = (cell, row, rowIndex) => {
    selectRowPropAfterClickRow.selectedOpponentName = `${row['NAME']}`;
    selectRowPropAfterClickRow.selectedOpponentRank = `${row['RANK']}`;
    // console.log('props.user.rankings')
    // console.log(props.user.chanllenges)
    if (props.user.username !== '') {
      _handleShowChallengeModal();
    } else {
      setWarningText('Error: Sorry your account is not recognized');
      // setState({
      //   warningText: 'Error: Sorry your account is not recognized'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   openWarningModal: true
      // });
    }
  }

  const onClickResultSelected = (cell, row, rowIndex) => {
    selectRowPropAfterClickRow.selectedOpponentName = `${row['NAME']}`;
    selectRowPropAfterClickRow.selectedOpponentRank = `${row['RANK']}`;
    openResultModal();
  }

  // TODO: Challenge/Enter button should be part of onrowselect, not a separate button
  //REVIEW: selectRowProp has to be defined in render for the onSelect to be bound to the
  //onSelectRow function within this component. This is not fully understood and needs to be
  //better understood
  //https://github.com/AllenFang/react-bootstrap-table/issues/1035

  const challengeButton = (cell, row, enumObject, rowIndex) => {
    return ( <
      button bsstyle = "primary"
      //type="button"
      onClick = {
        () =>
        onClickChallengeSelected(cell, row, rowIndex)
      } >
      Challenge <
      /button>
    )
  }

  const resultButton = (cell, row, enumObject, rowIndex) => {
    return ( <
      button bsstyle = "primary"
      //type="button"
      onClick = {
        () =>
        onClickResultSelected(cell, row, rowIndex)
      } >
      Result <
      /button>
    )
  }

  // updateWarningText = (warningText) => {
  //   setState({
  //     warningText: warningText
  //   });
  // };

  const openResultModal = () => {
    //NB: this is a NOT operation!
    const {
      rankingJSONdata
    } = props;
    if (!JSONops.isPlayerAvailableToEnterResultAgainst(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText('You must challenge an opponent before attempting to enter a result!');
      // setState({
      //   warningText: 'You must challenge an opponent before attempting to enter a result!'
      // });
      setWarningModalIsOpen(true);
      // setState({
      //   warningModalIsOpen: true
      // });
    } else {
      setResultModalIsOpen(true)
      // setState({
      //   resultModalIsOpen: true
      // });
      setWarningText('');
      // setState({
      //   warningText: ''
      // });
    }
  };

  const closeResultModal = () => {
    setResultModalIsOpen(false);
    // setState({
    //   resultModalIsOpen: false
    // });
  };

  const closeWarningModal = () => {
    setWarningModalIsOpen(false);
    // setState({
    //   warningModalIsOpen: false
    // });
  };

  // const postResultInfoForDisplayCB = () => {
  //   console.log('inside postResultInfoForDisplayCB')
  //   //return 'it would go here';
  //   setResultInfoForDisplay('set from postResultInfoForDisplayCB');
  // }

  //REVIEW: Managing display here might be handled differently:
  //this was originally a component - perhaps it still should be [?]
  const userPlayerJsonDataDisplay = () => {
    //console.log('userPlayerJsonDataDisplay');
      const textToDisplayRankName = JSONops._getGlobalRankingVal(props.rankingListJSONdata, props.newrankId, 'RANKINGNAME')
      const textToDisplayRankDesc = JSONops._getGlobalRankingVal(props.rankingListJSONdata, props.newrankId, 'RANKINGDESC')
      let textToDisplayRank = '';
      let textToDisplayChallenger = '';
      let textToDisplayChallengerContactNo = '';
      let textToDisplayChallengerEmail = '';
      let textToDisplayContinue = '';
      //if the json is empty do nothing
      //if (props.rankingJSONdata[0] === null) {
      if (props.rankingJSONdata === undefined) {
        console.log('json is empty inside userPlayerJsonDataDisplay');
        return null;
      }

      const currentUserRank = JSONops._getUserValue(props.rankingJSONdata, props.user.username, "RANK");
      const currentChallengerName = JSONops._getUserValue(props.rankingJSONdata, props.user.username, "CURRENTCHALLENGERNAME");
      const currentChallengerContactNo = JSONops._getUserValue(props.rankingJSONdata, currentChallengerName, "CONTACTNO");
      const currentChallengerEmail = JSONops._getUserValue(props.rankingJSONdata, currentChallengerName, "EMAIL");

      textToDisplayRank = 'Your current rank is: ' + currentUserRank;

      const currentUserName = JSONops._getUserValue(props.rankingJSONdata, props.user.username, "NAME");
      const activeBool = JSONops._getUserValue(props.rankingJSONdata, props.user.username, "ACTIVE");
      if (currentUserName === props.user.username && activeBool) {
        //console.log(details.RANK);
        if (currentChallengerName !== 'AVAILABLE') {
          textToDisplayChallenger = 'Your current challenge is VS ' + currentChallengerName;
          textToDisplayChallengerContactNo = 'Your challenger contact number is  ' + currentChallengerContactNo
          textToDisplayChallengerEmail = 'Your challenger email is  ' + currentChallengerEmail
          textToDisplayContinue = 'Enter a result against ' + currentChallengerName + ' to continue'

        } else {
          textToDisplayChallenger += 'You do NOT currently have a challenge'
          textToDisplayContinue += 'Please select an AVAILABLE opponent (below) to challenge: '
        }

        return ( <
          div >
          <
          h2 > {
            textToDisplayRankName
          } <
          /h2> <
          h4 > {
            textToDisplayRankDesc
          } <
          /h4> {
            props.user.username
          } <
          p > < /p> {
            textToDisplayRank
          } <
          p > < /p> {
            textToDisplayChallenger
          } <
          p > < /p>
          {
           textToDisplayChallengerContactNo
          } <
          p > < /p>
          {
           textToDisplayChallengerEmail
          } <
          p > < /p>
          {
            textToDisplayContinue
          } <
          /div>)
        }
        else
        if (currentUserName === props.user.username && !activeBool) {
          return ( <
            div >
            Your player is currently deactivated! < p > < /p>
            Click Reactivate(top menu) to re - enter the rankings(at the bottom) <
            /div>);
          }
          else {
            return (
              null);
          }
        }

        //NB: none of this code is currently running on a re-set
        const preprocessDataBeforeRender = () => {
          //if there is a username but it's not listed in the json,
          //add this user to the current list
          //REVIEW: This test may be more consistently handled
          if (props.user.username !== '' &&
            !JSONops.isPlayerListedInJSON(props.rankingJSONdata, props.user.username) &&
            props.loadingJSON === false &&
            //props.viewingOnlyCB === false
            props.setviewingOnlyCB(false)
          ) {
            console.log('createNewUserInJSON in preprocessDataBeforeRender in home.js')
            console.log('props.rankingID in preprocessDataBeforeRender in home.js', props.newrankId)
            const newUserJsonObj = JSONops.createNewUserInJSON(props.rankingJSONdata, props.user.username, props.contactno, props.email, props.account, props.description, props.newrankId);
            _sendJSONDataWithRankingID(newUserJsonObj, props.newrankId);
            console.log('player created')
          }

          if (props.isRankingIDInvalid) {
            props.history.push('/create');
          }

          if (JSONops.isJSONEmpty(props.rankingJSONdata) && props.user.username === null) {

            console.log('json is empty and there is no username');
            props.history.push('/create');
            return null;
            //(<div>No Data To Display - Please select an account (top right) to create a player</div>);
          }
          //if the player isn't listed in the json then add them (only if user clicked 'join')
          if (!JSONops.isPlayerListedInJSON(props.rankingJSONdata, props.user.username) &&
            props.viewingOnlyCB === false) {
              console.log('preprocessDataBeforeRender player not listed, join clicked')
            //originalData, username, contactno, email, accountno, description, rankingID)
            const newUserJsonObj = JSONops.createNewUserInJSON(props.rankingJSONdata, props.user.username, props.contactno, props.email, props.account, props.description, props.newrankId)
            _sendJSONDataWithRankingID(newUserJsonObj, props.newrankId);
          }
        }

        const bootstrapTableDisplay = () => {
          //if the json is empty and no account re-direct to create user
          //console.log('props.rankingJSONdata', props.rankingJSONdata)
          //REVIEW: this should only occur after an Embark re-set and there's no
          //inital account or data - there may be a better way to test for this

          if (JSONops.isJSONEmpty(props.rankingJSONdata) && props.user.username === null) {

            console.log('json is empty and there is no username');
            props.history.push('/create');
            return null;
            //(<div>No Data To Display - Please select an account (top right) to create a player</div>);
          } else {
            return ( <
              BootstrapTable
              data-testid="BootstrapTableTestId"
              options = {
                tablesortoptions
              }
              data = {
                props.rankingJSONdata
              } >
              <
              TableHeaderColumn isKey = {
                true
              }
              dataField = 'id'
              hidden >
              ID <
              /TableHeaderColumn>

              <
              TableHeaderColumn
              dataField = 'NAME'
              filter = {
                {
                  type: 'TextFilter',
                  defaultValue: ''
                }
              } >
              Player Name(Filter) <
              /TableHeaderColumn>

              <
              TableHeaderColumn dataField = 'RANK'
              dataSort width = {
                '7%'
              } >
              Rank <
              /TableHeaderColumn>

              <
              TableHeaderColumn dataField = 'CURRENTCHALLENGERNAME'
              filter = {
                {
                  type: 'TextFilter',
                  defaultValue: ''
                }
              } >
              Current Challenger(Filter) <
              /TableHeaderColumn>

              <
              TableHeaderColumn dataField = 'button'
              dataFormat = {
                challengeButton.bind(this)
              } >
              Challenge <
              /TableHeaderColumn>

              <
              TableHeaderColumn dataField = 'button'
              dataFormat = {
                resultButton.bind(this)
              } >
              Enter Result <
              /TableHeaderColumn>

              <
              TableHeaderColumn dataField = 'ACTIVE'
              filter = {
                {
                  type: 'TextFilter',
                  defaultValue: 'true'
                }
              }
              hidden >
              Active ?
              <
              /TableHeaderColumn>

              <
              /BootstrapTable>
            )
          }
        }

        // const componentDidMount = () => {
        //   preprocessDataBeforeRender();
        // }

      useEffect(() => {
         preprocessDataBeforeRender();
        }, [])


        //render() {
          // const selectRowProp = {
          //   mode: 'radio',
          //   clickToSelect: true,
          //   unselectable: [0],
          //   selected: [],
          //   bgColor: 'gold'
          // };

          //const { username } = props.user;

          let isError = props.error && props.error.message;
          //XXX: temp to run
          isError = false;
          //NB: Boolean forces props.account to be a Boolean
          const isLoading = !Boolean(props.account) && !isError;

          let states = {};

          // state when we are waiting for the App component to finish loading
          // the current account (address) from web3.eth.getAccounts()
          states.isLoading = < Spinner name = "pacman"
          color = "white"
          fadeIn = 'none' / > ;

          states.isError = < span className = 'error' > ERROR! < /span>;


          //const { rankingJSONdata, contactNoCB, emailCB } = props;
          const {
            rankingJSONdata
          } = props;
          return ( <
            div >

            <
            Modal show = {
              showModal
            }
            onHide = {
              (e) => _handleClose(e)
            } >
            <
            Modal.Header closeButton >
            <
            Modal.Title > Instructions < /Modal.Title> <
            /Modal.Header> <
            Modal.Body >
            Would you like to challenge {
              selectRowPropAfterClickRow.selectedOpponentName
            }
            {' '}who is ranked {
              selectRowPropAfterClickRow.selectedOpponentRank
            } ? < p > < /p> <
            DoChallenge closeModalOnAfterChallenge = {
              (e) => _handleClose()
            }
            data = {
              rankingJSONdata
            }
            selectedOpponentName = {
              selectRowPropAfterClickRow.selectedOpponentName
            }
            user = {
              props.user.username
            }
            //REVIEW: updateTextCB not doing anything
            updateTextCB = {
              updateWarningText
            }
            newrankId = {
              props.newrankId
            }
            setcontactNoCB= {
              props.setcontactNoCB
            }
            setemailCB= {
              props.setemailCB
            }
            >
            <
            /DoChallenge> <
            /Modal.Body> <
            Modal.Footer >
            <
            Button onClick = {
              (e) => _handleClose(e)
            } > Close < /Button> <
            /Modal.Footer> <
            /Modal>

            <
            Modal show = {
              resultModalIsOpen
            } >
            <
            Modal.Header closeButton >
            <
            Modal.Title > Please enter your result vs {
              selectRowPropAfterClickRow.selectedOpponentName
            } < /Modal.Title> <
            /Modal.Header> <
            Modal.Body >
            <
            EnterResult data = {
              rankingJSONdata
            }
            selectedOpponentRank = {
              selectRowPropAfterClickRow.selectedOpponentRank
            }
            user = {
              props.user.username
            }
            selectedOpponentName = {
              selectRowPropAfterClickRow.selectedOpponentName
            }
            // onAfterResult = {
            //   closeResultModal
            // }
            setResultModalIsOpenCB = {
              setResultModalIsOpenCB
            }
            newrankId = {
              props.newrankId
            }
            updateWarningText={
              updateWarningText
            }
            resultInfoForDisplay={
              props.resultInfoForDisplay
            }
            setResultInfoForDisplayCB={
              props.setResultInfoForDisplayCB
            }
            >
            <
            /EnterResult> <
            /Modal.Body> <
            Modal.Footer >
            <
            Button onClick = {
              closeResultModal
            } > Close < /Button> <
            /Modal.Footer> <
            /Modal>

            <
            Modal show = {
              warningModalIsOpen
            } >
            <
            Modal.Header closeButton >
            <
            Modal.Title > Please Note! < /Modal.Title> <
            /Modal.Header> <
            Modal.Body >
            <
            font color = "red" > {
              warningText
            } < /font> <
            /Modal.Body> <
            Modal.Footer >
            <
            Button onClick = {
              closeWarningModal
            } > Close < /Button> <
            /Modal.Footer> <
            /Modal>

            <
            Grid >
            <
            Row > {
              isLoading ?
              states.isLoading :
                isError ?
                states.isError :
                userPlayerJsonDataDisplay()
            } <
            div > {
              /* http://allenfang.github.io/react-bootstrap-table/example.html#sort */ } <
            h3 > {
              props.contactNoCB
            } < /h3> <
            h3 > {
              props.emailCB
            } < /h3> <
            h3 > {
              props.resultInfoForDisplay
            } < /h3>{
              bootstrapTableDisplay()
            } <
            /div>

            <
            Col xs = {
              12
            } >
            <
            h2 >

            <
            /h2> <
            /Col> <
            /Row> <
            Row >
            <
            Col xs = {
              12
            } >

            <
            /Col> <
            /Row> <
            /Grid> <
            /div>
          );
        }
        //#endregion
      //}

      //export default Home
