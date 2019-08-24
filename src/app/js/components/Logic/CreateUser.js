import { Grid, Button, Row, Col, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import FieldGroup from '../UI/FieldGroup'
//import JSONops from './JSONops'
//import {userNameCB, emailCB} from './App'
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
//import Grid from 'react-bootstrap/Grid'
//import PageHeader from 'react-bootstrap/PageHeader'


//helper class
// class UserConfirmCreateUser extends Component {
//
//    render(
//
//    ) {
//      const isLoading = false;
//               return (
//                 <div>
//                 hello
//                 <Button
//                   //bsStyle="primary"
//                   //disabled={ !isValid }
//                   //onClick={ !isValid ? null : (e) => this._continueClick(e) }
//                   onClick={ (e) => this._cancelClick(e) }
//                 >
//                 { isLoading ? 'Loading...' : 'Cancel' }
//                 </Button>
//                </div>);
//           }
//         }

/**
 * Class that renders a form to facilitate the creation
 * of a user in the contract.
 *
 * @extends React.Component
 */
class CreateUser extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);

    // initial state
    this.state = {
      isLoading: false,
      username: '',
      contactno: '',
      email: '',
      description: '',
      usernameHasChanged: false,
      error: '',
      WarningModalIsOpen: false,
      warningText: '',
      userConfirm: false,
      newRankId: ''
    };

  }

_continueClick = () => {
  //_continueClick(){
      this.setState({ userConfirm: true });
      //console.log('userConfirm in _continueClick1')
      //console.log(this.state.userConfirm)
      this.setState({ WarningModalIsOpen: false });
      //console.log('userConfirm in _continueClick2')
    //  console.log(this.state.userConfirm)
      if(this.props.newrankId === ''){
        console.log('_continueClick this.props.newrankId', this.props.newrankId)
        console.log('this.props.newrankId in createuser handleclick1', this.props.newrankId)
        this.props.getNewRankingID();
        console.log('this.props.newrankId in createuser handleclick2', this.props.newrankId)
        this._handleClick();
    } else {
      this._handleClick();
    }
      //console.log('_continueClick');
  }
  //#endregion

  //#region Component events
  /**
   * Handles the 'Create Account' button click event which
   * sends a transaction to the contract to create a user.
   *
   * @returns {null}
   */
  _handleClick = async () => {

    //console.log(JSONops.createNewUserInJSON());
    //TODO: all the json data for create new user is here ready to be appended to
    //console.log(this.props.rankingJSONdata);
    this.setState({ isLoading: true });

    //Player has to belong to a ranking (?)
    if(this.props.newrankId === ''){
      console.log('this.props.newrankId in createuser handleclick1', this.props.newrankId)
      this.setState({ newRankId: await this.getNewRankId() });
      //console.log('this.state.newrankId in createuser handleclick2', this.state.newRankId)
    }

    if (this.state.userConfirm === false){
      this.setState({ WarningModalIsOpen: true });
    }

    //NB: userNameCB callback function (to App.js)
    //so that the componentDidUpdate in app.js can do
    //getNewRankId() and set the player name in json
    console.log('this.state.username in _handleClick', this.state.username)
    this.props.setuserNameCB(this.state.username);
    this.props.setcontactNoCB(this.state.contactno);
    this.props.setemailCB(this.state.email);
    this.props.setuserDescCB(this.state.description);

//getNewRankId(description, account, email, contactno, user, getNewRankId_callback) {
    //const newrankId = await getNewRankId()

    //const { newrankId } = this.props;
    //console.log('newrankId in create user', newrankId)
    //only do this once the user has confirmed the user name because it cannot be
    //changed in future
    //if(this.state.userConfirm && newrankId !== ''){
      if(this.state.userConfirm){
              console.log('ready to go to createNewUserInNewJSON')
              //JSONops.createNewUserInNewJSON(this.state.username, this.state.contactno, this.state.email, this.props.account, this.state.description, this.state.newRankId);
              const { username, description } = this.state;
              try {
                // set up our contract method with the input values from the form
                console.log('newrankId ready to send to createAccount', this.state.newRankId)
                //const createAccount = DSportRank.methods.createAccount(username, this.state.contactno, this.state.email, description, newrankId);
                //does user need newRankId?
                const createAccount = DSportRank.methods.createAccount(username, this.state.contactno, this.state.email, description, '');
                console.log('createAccount created', createAccount)
                // get a gas estimate before sending the transaction
                const gasEstimate = await createAccount.estimateGas({ from: web3.eth.defaultAccount, gas: 10000000000 });
                // send the transaction to create an account with our gas estimate
                // (plus a little bit more in case the contract state has changed).
                const result = await createAccount.send({ from: web3.eth.defaultAccount,  gas: gasEstimate + 1000 });
                // check result status. if status is false or '0x0', show user the tx details to debug error
                if (result.status && !Boolean(result.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
                  return this.setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
                }
                console.log('b4 _setUserNameValue')
                //update the json with the username (which wasn't available before the form submit)
                //JSONops._setUserNameValue(this.props.rankingJSONdata, userAccountNo, 'NAME', username, newrankId);

                // Completed of async action, set loading state back
                this.setState({ isLoading: false });
                // tell our parent (app.js) that we've created a user so it
                // will re-fetch the current user details from the contract (re-load the account info)
                this.props.onAfterUserUpdate();
                // redirect user to the  update user page
                //this.props.history.push('/update/@' + username);

                this.props.history.push('/');
              } catch (err) {
                // stop loading state and show the error
                this.setState({ isLoading: false, error: err.message });
              };
            //user didn't confirm
          }else{
              console.log('user has not confirmed or no rankid obtained')
              // if(newrankId === ''){
              //   this.setState({ WarningModalIsOpen: false });
              //   this.setState({ isLoading: false });
              //
              // }
            // const wtext = 'Please ensure your username is as you want it'
            // wtext = ' since it CANNOT be changed, even if you de-activate your account!'
            //   this.setState({ warningText: wtext });
          }
  }

  componentDidMount(){
    const newRankingId = this.getNewRankId();
    //
    this.setState({ newRankId: newRankingId });
  }

  //TODO:add code to get from jsonbin.io
  //_handleClick1 = async () => {
   getNewRankId = async () => {
   //getNewRankId(){
      try{
      this.setState({ isLoading: true});
      let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
          //this async section tests whether the result
          //from the code lower down has been returned
          //(without using await)
          if (req.readyState === XMLHttpRequest.DONE) {
            const resulttxt = JSON.parse(req.responseText);
            console.log('resulttxt', resulttxt)
            //only here can set state (once result is back)
            this.props.setnewrankIdCB(resulttxt.id)
            this.setState({ rankId: resulttxt.id});
            //this.setState({ ranknameHasChanged: true});
            //this.setState({ isLoading: false});
            // console.log('this.state.rankId')
            // console.log(this.state.rankId)
          }
        };
        //NB: following will send the request but
        //need to wait for the results to come back
        //(above) before any further processing can be
        //don
        req.open("POST", "https://api.jsonbin.io/b", true);
        const jsonbinSecretKey = "$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i";
        //req.setRequestHeader("Content-Type", "application/json", "secret-key", "$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i");
        req.setRequestHeader("Content-type", "application/json");
        req.setRequestHeader("secret-key", jsonbinSecretKey);
        //req.setRequestHeader("secret-key", "$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i");
        //req.send('{"Ranking": "NewRanking"}') || {}
        //NB: below done so that jsonobj can be tested for new
        //id set for table display and correct ranking setting
        //REVIEW: may handle below differently but getting rankingid involves
        //chicken and egg problem getting an initiial json
        //req.send('{"RANKING": "NEWRANKING", "STATUS":"NEW", "id":1}') || {}
        const { account } = this.props;
        req.send('{"RANKING": "NEWRANKING", "STATUS":"NEW", "id":1, "ACTIVE": false,"RANK": 0,"CURRENTCHALLENGERNAME": "AVAILABLE", "ACCOUNT": "' + account + '" }')
        }catch (err) {
        // stop loading state and show the error
        console.log(err)
        this.setState({ isLoading: false, error: err.message });
      };
        return null;
    }

  getUserConfirmationOfAccountCreation(){
    //REVIEW: Fix the validation isLoading if necessary
     const isLoading = false;
     let  wtext = 'Please ensure your username (' + this.state.username + ') is exactly as you want it'
            wtext += ' since it CANNOT be changed, even if you de-activate your account!'
    return (
      <div>
      {wtext}<p></p>
      <Button
        bsStyle="primary"
        //validation is done by the 'create user' button
        //not here
        // disabled={ !isValid }
        // onClick={ !isValid ? null : (e) => this._handleClick(e) }
        onClick={ (e) => this._cancelClick(e) }
      >
      { isLoading ? 'Loading...' : 'Cancel' }
      </Button><p></p>
      Go ahead I am happy with this username: <p></p>
      <Button
        bsStyle="primary"
        //validation is done by the 'create user' button
        //not here
        // disabled={ !isValid }
        // onClick={ !isValid ? null : (e) => this._continueClick(e) }
        onClick={ (e) => this._continueClick(e) }
      >
      { isLoading ? 'Loading...' : 'Continue' }
      </Button>
     </div>);
  }

  /**
   * When user changes an input value, record that in the state.
   * Additionally, if the username field was updated, perform a
   * check to see if the username already exists in the contract
   * and set the component state accordingly
   *
   * @param {SyntheticEvent} cross-browser wrapper around the browser’s native event
   *
   * @return {null}
   */
  _handleChange = async(e) => {
    let state = {};
    const input = e.target.name;
    const value = e.target.value;

    state[input] = value;
    console.log('state[input]', state[input])
    console.log('state', state)
    if (input === 'username') {
      state.usernameHasChanged = true;
      if (value.length >= 5) {
        // ensure we're not already loading the last lookup
        if (!this.state.isLoading) {
          //console.log('inside handle change')
          // call the userExists method in our contract asynchronously
          DSportRank.methods.userExists(web3.utils.keccak256(value)).call()
          .then((exists) => {
            // stop loading state
            state.isLoading = false;
            // show error to user if user doesn't exist
            state.error = exists ? 'Username not available' : '';
            this.setState(state);
          }).catch((err) => {
            // stop loading state
            state.isLoading = false;
            // show error message to user
            state.error = err.message;
            this.setState(state);
          });
          // set loading state while checking the contract
          state.isLoading = true;
        }
        // we are loading already, do nothing while we wait
        return true;
      }
    }
    this.setState(state);
  }
  //#endregion

  //#region Helper methods
  /**
   * Validates the form. Return null for no state change,
   * 'success' if valid, and error' if invalid.
   *
   * @return {string} null for no state change, 'success'
   * if valid, and error' if invalid
   */
  _getValidationState() {
    //console.log('this.props.newrankId in _getValidationState in createuser', this.props.newrankId)
    // considered valid while loading as we don't know yet
    if (this.state.isLoading) return null;

    // check that we have at least 5 characters in the username
    const length = this.state.username.length;
    if (length === 0){
      if(this.state.usernameHasChanged) return 'error';
      return null;
    }
    if (length <= 5) return 'error';

    // don't allow '@' or spaces
    if(new RegExp(/[@\s]/gi).test(this.state.username)) return 'error';

    //check we have a new ranking id
    //if(this.props.newrankId === '') return 'error';

    // if we have an error, returning 'error' shows the user
    // the form is in error (red). Conversely, returning 'success'
    // shows the user the form is valid (green).
    return this.state.error.length > 0 ? 'error' : 'success';
  }

  _cancelClick(e) {
    try {
    //this.props.history.push('/');
    //console.log('user cancelled')
    this.setState({ userConfirm: false });
    this.setState({ WarningModalIsOpen: false });
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  closeWarningModal = () => {
    this.setState({ WarningModalIsOpen: false });
  };
  //#endregion

  //#region React lifecycle events
  render() {
    const { isLoading } = this.state;
    const { address } = this.props.account;
    let validationState = this._getValidationState();
    let isValid = validationState === 'success' && !isLoading && !this.state.error;
    let feedback = isValid ? 'Username is available' : this.state.error || 'Usernames must be 6 or more characters and cannot include @ or spaces.';

    if (!this.state.usernameHasChanged) feedback = '';

    return (
      <Grid>
      <Modal
          show={this.state.WarningModalIsOpen}
        >
        <Modal.Header closeButton>
          <Modal.Title>Please Note!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.getUserConfirmationOfAccountCreation()}

        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeWarningModal}>Close</Button>

          </Modal.Footer>
        </Modal>
        <Row>
          <Col xs={12}>
          <h2>Create An Account Name<small> for account number:  { address }</small></h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <form onSubmit={ !isValid ? null : (e) => this._continueClick(e) }>
              <FieldGroup
                type="text"
                value={ this.state.username }
                disabled={ isLoading }
                placeholder="No gaps e.g. My_SRAccount1 - Must be unique. Cannot be changed!"
                onKeyPress={ (e) => e.key === '@' || e.key === ' ' ? e.preventDefault() : true }
                onChange={ (e) => this._handleChange(e) }
                name="username"
                autoComplete="off"
                label="Desired Account Name (Cannot Be Changed!)"
                validationState={ validationState }
                hasFeedback={ true }
                help={ feedback }
                inputAddOn={
                  {
                    location: 'before',
                    addOn: '@'
                  }
                }
              />
              <FieldGroup
                type="text"
                value={ this.state.contactno }
                placeholder="Contact Number"
                onChange={(e) => this._handleChange(e)}
                name="contactno"
                label="Your Contact Number"
              />
              <FieldGroup
                type="text"
                value={ this.state.email }
                placeholder="Contact Email"
                onChange={(e) => this._handleChange(e)}
                name="email"
                label="Your Contact Email"
              />
              <FieldGroup
                type="text"
                value={ this.state.description }
                placeholder="Relevant info e.g. your current grade and usual availability"
                onChange={(e) => this._handleChange(e)}
                name="description"
                label="Player Description"
              />
              <Button
                bsStyle="primary"
                disabled={ !isValid }
                onClick={ !isValid ? null : (e) => this._continueClick(e) }
                //onClick={ (e) => this._continueClick(e) }
              >
                { isLoading ? 'Loading...' : 'Create Account' }
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
  //#endregion
}

export default withRouter(CreateUser);
