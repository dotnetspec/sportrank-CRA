import {
  Grid,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import React, {
  useState
} from 'react'
import JSONops from './JSONops'
/**
 * REVIEW: Class that renders a form to facilitate the deletion
 * of a user (or player?) in the contract (or just json?).
 *
 * @extends React.Component
 */
export default function DeactivatePlayer(props) {
  const [isLoading] = useState(false)
  //#endregion

  //#region Component events
  /**
   * Handles the 'Create Account' button click event which
   * sends a transaction to the contract to create a user.
   *
   * @returns {null}
   */

  //QUESTION: why does below not work with props.history.push('/');?
  //_handleClick = async () => {
  const _handleClick = () => {
    try {
      JSONops.deactivatePlayer(props.newrankId, props.rankingJSONdata, props.user.username, props.account);
      props.setOnCallbackisCurrentUserActiveCB(false);
      props.history.push('/home/@' + props.user.username);
    } catch (err) {
      // stop loading state and show the error
      console.log(err.message);
    };
  }

  const _cancelClick = () => {
    try {
      props.setspecificRankingOptionBtnsCB(false);
      props.history.push('/');
    } catch (err) {
      // stop loading state and show the error
      console.log(err.message);
    };
  }
  return ( <
    >
    <
    Grid >
    <
    Row className = "show-Grid" >
    <
    Col xs = {
      12
    }
    md = {
      8
    } >
    <
    h3 align = 'center' > Are you sure you want to deactive this player ? < /h3> <
    h5 align = 'center' > (You can re - activate(at the bottom of the rankings) in future via 'Update Profile') < /h5> <
    /Col> <
    /Row> <
    Row className = "show-Grid" >
    <
    Col xs = {
      12
    }
    md = {
      8
    }
    xsOffset = {
      3
    } >

    <
    Button bsStyle = "primary"
    //disabled={ !isValid }
    //onClick={ !isValid ? null : (e) => _handleClick(e) }
    onClick = {
      () => _handleClick()
    } >
    {
      isLoading ? 'Loading...' : 'De-Activate Player'
    } <
    /Button> <
    /Col> <
    /Row> <
    p > < /p> <
    Row className = "show-Grid" >
    <
    Col xs = {
      12
    }
    md = {
      8
    }
    xsOffset = {
      3
    } >
    <
    Button bsStyle = "primary"
    //disabled={ !isValid }
    //onClick={ !isValid ? null : (e) => _handleClick(e) }
    onClick = {
      () => _cancelClick()
    } >
    {
      isLoading ? 'Loading...' : 'Cancel'
    } <
    /Button> <
    /Col> <
    /Row> <
    /Grid> <
    />
  );
}
