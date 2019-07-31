import { Grid, Button, Row, Col } from 'react-bootstrap';
//import Grid from 'react-bootstrap/Grid'
import { withRouter } from 'react-router-dom'
import React, { Component, useState } from 'react'
//import FieldGroup from './FieldGroup'
import JSONops from './JSONops'
//import Grid from 'react-bootstrap/Grid'

/**
 * REVIEW: Class that renders a form to facilitate the deletion
 * of a user (or player?) in the contract (or just json?).
 *
 * @extends React.Component
 */
//class DeactivatePlayer extends Component {
  export default function DeactivatePlayer(props){
  //const DeactivatePlayer = withRouter(({ history, ...props }) => (


  //#region Constructor
  // constructor(props, context) {
  //   super(props, context);
  //
  //   // initial state
  //   state = {
      //isLoading: false,

      const [isLoading, setisLoading] = useState(false)
      //username: '',
      const [username, setusername] = useState('')
      //description: '',
      const [description, setdescription] = useState('')
      //usernameHasChanged: false,
      const [usernameHasChanged, setusernameHasChanged] = useState('')
      //error: ''
      const [iserror, setiserror] = useState(false)
  //   };
  // }
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
      console.log('props.newrankId',props.newrankId)
      console.log('props.user.userName',props.user.username)
      console.log('props.user.userName',props.user.username)

    JSONops.deactivatePlayer(props.newrankId, props.rankingJSONdata, props.user.username, props.account);
    //props.isCurrentUserActiveCB(false);
    props.setOnCallbackisCurrentUserActiveCB(false);
    props.history.push('/home/@' + props.user.username);
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  const _cancelClick = () => {
    try {
    props.history.push('/');
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  //#endregion

  //#region React lifecycle events
  //render() {
    //console.log('props.user in deactivateplayer', props.user.username);
    //const { isLoading } = state;
    // let validationState = _getValidationState();
    // let isValid = validationState === 'success' && !isLoading && !state.error;
    // let feedback = isValid ? 'Username is available' : state.error || 'Usernames must be 6 or more characters and cannot include @ or spaces.';
    //
    // if (!state.usernameHasChanged) feedback = '';
    return(
      <>
        <Grid>
          <Row className="show-Grid">
            <Col xs={12} md={8}>
              <h3 align='center'>Are you sure you want to deactive this player?</h3>
              <h5 align='center'>(You can re-activate (at the bottom of the rankings) in future via 'Update Profile')</h5>
            </Col>
          </Row>
          <Row className="show-Grid">
            <Col xs={12} md={8} xsOffset={3} >

              <Button
                bsStyle="primary"
                //disabled={ !isValid }
                //onClick={ !isValid ? null : (e) => _handleClick(e) }
                onClick={ () => _handleClick() }
              >
              { isLoading ? 'Loading...' : 'De-Activate Player' }
              </Button>
            </Col>
          </Row>
          <p></p>
          <Row className="show-Grid">
            <Col xs={12} md={8} xsOffset={3} >
              <Button
                bsStyle="primary"
                //disabled={ !isValid }
                //onClick={ !isValid ? null : (e) => _handleClick(e) }
                onClick={ () => _cancelClick() }
              >
              { isLoading ? 'Loading...' : 'Cancel' }
              </Button>
            </Col>
          </Row>
        </Grid>
      </>
    );
//  }
  //#endregion
}

//export default withRouter(DeactivatePlayer);
