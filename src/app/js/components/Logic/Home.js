import React, {
  //Component,
  useState, useEffect
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
//import DoChallenge from './DoChallenge'
import EnterResult from './EnterResult'
import JSONops from './JSONops'
import {userInfoText} from './TextOps'
//import _sendJSONDataWithRankingID from '../SideEffects/io/Jsonio'
import DoChallengeModal from '../UI/Modals/DoChallengeModal';
import MMWaitModal from '../UI/Modals/MMWaitModal'
import LadderInfoPanel from '../UI/LadderInfoPanel'
import LadderUserPanel from '../UI/LadderUserPanel'
//import Grid from 'react-bootstrap/Grid'
//import PageHeader from 'react-bootstrap/PageHeader'

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

/**
 * Functional component representing the home page rendering
 * Important functions:
 * preprocessDataBeforeRender() e.g. handles if user doesn't exist yet etc.
 *
 * @extends React.Component
 */

//we can use export here because we only ever export the whole component
//not individual sub functions (unlike eg.TextOps)
  export default function Home(props){
      const [showModal, setshowModal] = useState(false)
      const [resultModalIsOpen, setResultModalIsOpen] = useState(false)
      const [warningModalIsOpen, setWarningModalIsOpen] = useState(false)
      const [warningText, setWarningText] = useState('')
      const [showMMModal, setShowMMModal] = useState(false)
      //const [rank, setRank] = useState(0)
      //const [contactNoCB, setcontactNoCB] = useState('')
      //const [emailCB, setEmailCB] = useState('')
      //const [data, setData] = useState('')
      const [resultInfoForDisplay, setResultInfoForDisplay] = useState('')
      //const [tableData, setTableData] = useState('')
      //const [hasTableDrawnOnceOnly, setHasTableDrawnOnceOnly] = useState(false)
    //}

    const tablesortoptions = {
      defaultSortName: 'RANK', // default sort column name
      defaultSortOrder: 'asc' // default sort order
    };

    const setResultModalIsOpenCB = (openOrCloseBool) => {
      console.log('setResultModalIsOpenCB', openOrCloseBool)
      setResultModalIsOpen(openOrCloseBool);
    }

    const setResultInfoForDisplayCB = (resultInfo) => {
      console.log('setResultModalIsOpenCB', resultInfo)
      setResultInfoForDisplay(resultInfo);
    }
  /**
   * Hides the challenge modal
   */
  const closeMMWaitModalCB = () => {
    //if we are here then we also want to close the DoChallenge modal
    setShowMMModal(false);
    setshowModal(false);
  }

  const closeChallengeModalCB = () => {
      setshowModal(false);
    }

  const updateWarningText = (warningText) => {
      setWarningText(warningText);
   }

  const _handleShowChallengeModal = () => {
    setWarningText('');
    const {
      rankingJSONdata
    } = props;
    if (selectRowPropAfterClickRow.selectedOpponentName === props.user.username) {
      setWarningText(' You cannot challenge yourself!');
      setWarningModalIsOpen(true);
    } else if (!JSONops.isPlayerLowerRankThanChallengeOpponent(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' This opponent is lower than you in the rankings - aim high!');
      setWarningModalIsOpen(true);
    } else if (JSONops.isPlayerAlreadyChallengingThisOpp(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' You are already challenging this player!')
      setWarningModalIsOpen(true);
    } else if (!JSONops.isPlayerAvailableToChallenge(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText(' Please allow ongoing challenge(s) to complete ...');
      setWarningModalIsOpen(true);
    } else {
      setShowMMModal(true);
      setshowModal(true);
      //setWarningText('');
    }
  }

  const onClickChallengeSelected = (cell, row, rowIndex) => {
    selectRowPropAfterClickRow.selectedOpponentName = `${row['NAME']}`;
    selectRowPropAfterClickRow.selectedOpponentRank = `${row['RANK']}`;
    setResultInfoForDisplay('');
      if(!JSONops.isPlayerListedInJSON(props.rankingJSONdata, props.user.username)){
        setWarningText(` You are not currently listed in this ranking.
        Please click ListAllRankings
        and then Join to select the ranking you wish to be added to`);
        setWarningModalIsOpen(true);
      } else if (props.user.username !== '') {
      _handleShowChallengeModal();
      //props.onAfterUserUpdate();
    } else {
      setWarningText('Error: Sorry your account is not recognized');
      setWarningModalIsOpen(true);
    }
  }

  const onClickResultSelected = (cell, row, rowIndex) => {
    selectRowPropAfterClickRow.selectedOpponentName = `${row['NAME']}`;
    selectRowPropAfterClickRow.selectedOpponentRank = `${row['RANK']}`;
    setResultInfoForDisplay('');
    console.log('username', props.user.username)
    if(!JSONops.isPlayerListedInJSON(props.rankingJSONdata, props.user.username)){
      setWarningText(` You are not currently listed in this ranking.
      Please click ListAllRankings
      and then Join to select the ranking you wish to be added to`);
      setWarningModalIsOpen(true);
    }else{
      openResultModal();
    }
  }

  const challengeButton = (cell, row, enumObject, rowIndex) => {
    return ( <
      button bsstyle = "primary"
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
      onClick = {
        () =>
        onClickResultSelected(cell, row, rowIndex)
      } >
      Result <
      /button>
    )
  }

  const openResultModal = () => {
    //NB: this is a NOT operation!
    const {
      rankingJSONdata
    } = props;
    if (!JSONops.isPlayerAvailableToEnterResultAgainst(rankingJSONdata, selectRowPropAfterClickRow.selectedOpponentName, props.user.username)) {
      setWarningText('You must challenge an opponent before attempting to enter a result!');
      setWarningModalIsOpen(true);
    } else {
      setResultModalIsOpen(true)
      setWarningText('');
    }
  };

  const closeResultModal = () => {
    setResultModalIsOpen(false);
  };

  const closeWarningModal = () => {
    setWarningModalIsOpen(false);
  };
  //REVIEW: Managing display here might be handled differently:
  //this was originally a component - perhaps it still should be [?]
  const userPlayerJsonDataDisplay = () => {
    //console.log('userPlayerJsonDataDisplay', userPlayerJsonDataDisplay)
      //get a json obj with all the user data in it
      const jsonOpsReturnOjb = JSONops.createUserPlayerJsonDataDisplay(props.rankingListJSONdata, props.newrankId, props.rankingJSONdata, props.user);

      //IF there's an active user ...
      if (jsonOpsReturnOjb.currentUserName === props.user.username && jsonOpsReturnOjb.activeBool) {
        const textOpsReturnOjb = userInfoText(jsonOpsReturnOjb.currentChallengerName, jsonOpsReturnOjb.currentChallengerContactNo,
        jsonOpsReturnOjb.currentChallengerEmail, jsonOpsReturnOjb.currentUserRank);
        //jsx below has to remain in scope (cannot move it out)
        return (
          <React.Fragment>
            <LadderInfoPanel jsonObj={jsonOpsReturnOjb} rankingJSONdata={props.rankingJSONdata}></LadderInfoPanel>
            <LadderUserPanel txtObj={textOpsReturnOjb}  username={props.user.username}></LadderUserPanel>
          </React.Fragment>
        )
        }
        //there's no ACTIVE user
        else
        if (jsonOpsReturnOjb.currentUserName === props.user.username && !jsonOpsReturnOjb.activeBool) {
          return ( <
            div >
            Your player is currently deactivated! < p > < /p>
            Click Reactivate(top menu) to re - enter the rankings(at the bottom) <
            /div>);
          }
          //it's a new ranking no=one has joined or some other problem
          else {
            return (
                <LadderInfoPanel jsonObj={jsonOpsReturnOjb} rankingJSONdata={props.rankingJSONdata}></LadderInfoPanel>
            );
          }
        }

        const bootstrapTableDisplay = () => {
          //if the json is empty and no account re-direct to create user
          //console.log('props.rankingJSONdata', props.rankingJSONdata)
          //REVIEW: this should only occur after an Embark re-set and there's no
          //inital account or data - there may be a better way to test for this
          //console.log('rankingJSONdata', props.rankingJSONdata)
          if (JSONops.isJSONEmpty(props.rankingJSONdata) && props.user.username === null) {

            console.log('json is empty and there is no username');
            props.history.push('/create');
            return null;
            //(<div>No Data To Display - Please select an account (top right) to create a player</div>);
            //only allow the table to draw itself once
            //to enable a new user joining not to be overwritten
            //REVIEW: better understanding of why overwrite occuring needed ...
          } else {
          //if(hasTableDrawnOnceOnly){
            //setHasTableDrawnOnceOnly(true);
            //console.log('redraw the table with ', props.rankingJSONdata)
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

      const {setviewingOnlyCB} = props;

      useEffect(() => {
        if(props.rankingJSONdata === undefined){
          //refresh if the cb from join btn doesn't update the prop in time
          props.onAfterUserUpdate();
        }
           //set to viewingOnly and re-render
           setviewingOnlyCB(true);
       }, [props, setviewingOnlyCB])

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
            <MMWaitModal show={showMMModal} closeModalCB={closeMMWaitModalCB}></MMWaitModal>
            <DoChallengeModal
            show={showModal}
            closeChallengeModalCB={closeChallengeModalCB}
            closeMMWaitModalCB={closeMMWaitModalCB}
            selectedOpponentName={selectRowPropAfterClickRow.selectedOpponentName}
            selectedOpponentRank={selectRowPropAfterClickRow.selectedOpponentRank}
            closeModalOnAfterChallenge = {
              closeChallengeModalCB
            }
            //userPlayerJsonDataDisplay={userPlayerJsonDataDisplay}
            rankingJSONdata = {
              props.rankingJSONdata
            }
            user = {
              props.user.username
            }
            //REVIEW: updateTextCB not doing anything
            // updateTextCB = {
            //   updateWarningText
            // }
            newrankId = {
              props.newrankId
            }
            setcontactNoCB= {
              props.setcontactNoCB
            }
            setemailCB= {
              props.setemailCB
            }
            ></DoChallengeModal>
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
              resultInfoForDisplay
            }
            setResultInfoForDisplayCB={
              setResultInfoForDisplayCB
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
              resultInfoForDisplay
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
