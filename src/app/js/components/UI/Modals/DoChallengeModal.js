import {
  Button,
  Modal
} from 'react-bootstrap';

import React
from 'react';
import DoChallenge from '../../Logic/DoChallenge'

//actual display is controlled by closeModalCB
//sent via props.closeModalCB in parent
export default function DoChallengeModal(props) {

  // const mainMsgTxt = `Please confirm the update with
  // Metamask (possibly a separate window) and wait for the
  // transaction to be mined to the blockchain to see your new
  // challenge listed
  // `;

  // const _handleClose = () => {
  //   //props.closeChallengeModalCB();
  //   props.closeMMWaitModalCB
  // }

  if (!props.show) {
    return null;
  } else {

    return ( <
      div >
      <
      Modal show = {
        props.show
      }
      onHide = {
        //e) => _handleClose(e)
        //_handleClose()
        props.closeChallengeModalCB
      } >
      <
      Modal.Header closeButton >
      <
      Modal.Title > Instructions < /Modal.Title> <
      /Modal.Header> <
      Modal.Body >
      Would you like to challenge {
        //selectRowPropAfterClickRow.selectedOpponentName
        props.selectedOpponentName
      }
      {' '}who is ranked {
        props.selectedOpponentRank
      } ? < p > < /p> <
      DoChallenge closeModalOnAfterChallenge = {
        //(e) => _handleClose()
        props.closeChallengeModalCB
      }
      account = {
        props.account
      }
      data = {
        props.rankingJSONdata
      }
      selectedOpponentName = {
        props.selectedOpponentName
      }
      user = {
        props.user
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
      //userPlayerJsonDataDisplay={userPlayerJsonDataDisplay}
      >
      <
      /DoChallenge> <
      /Modal.Body> <
      Modal.Footer >
      <
      Button onClick = {
        //_handleClose()
        props.closeMMWaitModalCB
        //props.closeChallengeModalCB
      } > Close < /Button> <
      /Modal.Footer> <
      /Modal> <
      /div>
    );
  }
}
