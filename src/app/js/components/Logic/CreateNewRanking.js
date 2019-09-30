import { Grid, Button, Row, Col, Modal } from 'react-bootstrap';
import React, { Component } from 'react'
import FieldGroup from '../UI/FieldGroup'
import JSONops from './JSONops'
import web3 from '../../../../web3';
import { estimateGas } from '../SideEffects/io/estimateGas';
import { newRankingSendToContract } from '../SideEffects/io/newRankingSendToContract';
/**
 * Class that renders a form to facilitate the creation
 * of a new rank list in the contract.
 * Based on a mix of CreateUser and DoChallenge components
 *
 * @extends React.Component
 */
class CreateNewRanking extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      username: '',
      rankDescription: '',
      ranknameHasChanged: false,
      error: '',
      WarningModalIsOpen: false,
      warningText: '',
      userConfirm: false,
      rankName: '',
      rankId: ''
    };
    console.log('this.props.rankingListJSONdata', this.props.rankingListJSONdata)
  }

  componentDidMount(){
    const newRankingId = this.getNewRankId();
    this.setState({ rankId: newRankingId });
  }

_continueClick = () => {
      this.setState({ userConfirm: true });
      this.setState({ WarningModalIsOpen: false });
      //get a new rank Id ready
      this._handleCreateNewRankingClick();
  }
  //#endregion

  //#region Component events
  /**
   * Handles the 'Create New Ranking' button click event which
   * sends a transaction to the contract to create a ranking.
   *
   * @returns {null}
   */


  /**
   * Handles the 'create new ranking' button click event which
   * sends a transaction to the contract to store a
   * ranking list in an array for the current user.
   *
   * @returns {null}
   */
  _handleCreateNewRankingClick = async (e) => {
      console.log('in _handleCreateNewRankingClick');
      console.log('user', this.props.user.username)
    // show loading state
    this.setState({ isLoading: true });
    //REVIEW: I don't see how these props from orig are used
    //const { username, account, onAfterChallenge } = this.props;
    //this.challengeInput = "at last!";
    //const sendETHDev = DSportRank.methods.sendETHDev();
    if (this.state.userConfirm === false){
      this.setState({ WarningModalIsOpen: true });
    }
    //only do this once the user has confirmed the rank name
    if(this.state.userConfirm){
            try{
              const usernameHash = web3.utils.keccak256(this.props.user.username);
              //const updatedDescription = this.state.rankDescription;
              //TODO: dummy value - This needs to be fully implemented with IPFS
              const updatedImageHash = 'Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL';
              console.log('newRankingId in CreateNewRanking', this.props.newrankId)

                  //REVIEIW: Not sure this is doing anything affecting app as all the work
                  //done in json currently:
                  //gasEstimate, usernameHash, updatedContactno, updatedEmail, updatedDescription, newrankId, updatedImageHash
                  console.log('usernameHash', usernameHash);
                  const result = await newRankingSendToContract(usernameHash, this.props.newrankId, updatedImageHash);
                   // check result status. if status is false or '0x0', show user the tx details to debug error
                   // if (result.status && !Boolean(result.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
                   //   return this.setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
                   // }
                // }
                console.log('result status',await result)

               //REVIEW: New ranking must come after editAccount.send() in case e.g. there's not enough gas
               //otherwise, if this goes through there could be ranking errors etc.

               console.log('before _sendCreateNewRankingJSONData this.props.', this.props.newrankId)
              const resultOfSendJsonToGlobalList = await JSONops._sendCreateNewRankingJSONData(this.props.rankingListJSONdata, this.props.newrankId ,this.state.rankName,this.state.rankDescription )
              console.log('resultOfSendJsonToGlobalList', resultOfSendJsonToGlobalList)
              //add current user to the new ranking list as the first player
              //no because they might just be an administrator

              // change loading state
              this.setState({ isLoading: false });

              // redirect user to the  GlobalRankings page
               this.props.history.push('/');

            }
            catch(err){
              console.log(err)
              // remove loading state and show error message
              this.setState({ isLoading: false, error: err.message });
            }

          }else{
              console.log('user has not confirmed')
            // const wtext = 'Please ensure your username is as you want it'
            // wtext = ' since it CANNOT be changed, even if you de-activate your account!'
            //   this.setState({ warningText: wtext });
          }
  }

//TODO:add code to get from jsonbin.io
getNewRankId = async () => {
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
          this.setState({ ranknameHasChanged: true});
          this.setState({ isLoading: false});
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
      req.send('{"RANKING": "NEWRANKING", "STATUS":"NEW", "id":1, "ACTIVE": false,"RANK": 0,"CURRENTCHALLENGERNAME": "AVAILABLE"}')
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
     let  wtext = 'Please ensure your new Ranking name (' + this.state.rankName + ') is exactly as you want it'
            wtext += ' since it CANNOT be changed, even if you de-activate your account!'
    return (
      <div>
      {wtext}<p></p>
      <Button
        bsstyle="primary"
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
        bsstyle="primary"
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
   //delete old _handleChange if new one successfully implemented below
  // _handleChange = async(e) => {
  //   let state = {};
  //   const input = e.target.name;
  //   const value = e.target.value;
  //
  //   state[input] = value;
  //   if (input === 'rankName') {
  //     state.rankingnameHasChanged = true;
  //     if (value.length >= 5) {
  //       // ensure we're not already loading the last lookup
  //       if (!this.state.isLoading) {
  //         //console.log('!this.state.isLoading', !this.state.isLoading)
  //         //DSportRank.methods.rankingExists(value).call()
  //         //get the current json ranking list (not from contract)
  //         //console.log('this.props.rankingListJSONdata',this.props.rankingListData)
  //         JSONops.isExistingRankingName(this.props.rankingListJSONdata, value)
  //         .then((exists) => {
  //           // stop loading state
  //           state.isLoading = false;
  //           // show error to user if user doesn't exist
  //           state.error = exists ? 'Rank name not available' : '';
  //           this.setState(state);
  //         }).catch((err) => {
  //           // stop loading state
  //           state.isLoading = false;
  //           // show error message to user
  //           state.error = err.message;
  //           this.setState(state);
  //         });
  //         // set loading state while checking the contract
  //         state.isLoading = true;
  //       }
  //       // we are loading already, do nothing while we wait
  //       return true;
  //     }
  //   }
  //   this.setState(state);
  // }

  _handleChange = async(e) => {
    let state = {};
    const input = e.target.name;
    const value = e.target.value;

    state[input] = value;
    if (input === 'rankName') {
      state.rankingnameHasChanged = true;
      if (value.length >= 5) {
        // ensure we're not already loading the last lookup
        if (!this.state.isLoading) {
          //console.log('!this.state.isLoading', !this.state.isLoading)
          //DSportRank.methods.rankingExists(value).call()
          //get the current json ranking list (not from contract)
          //console.log('this.props.rankingListJSONdata',this.props.rankingListData)
          //if(JSONops.isExistingRankingName(this.props.rankingListJSONdata, value)){
            // stop loading state
            state.isLoading = false;
            // show error to user if ranking name already exists
            //state.error = exists ? 'Rank name not available' : '';
            console.log('existing ranking?', JSONops.isExistingRankingName(this.props.rankingListJSONdata, value))
            state.error = JSONops.isExistingRankingName(this.props.rankingListJSONdata, value) ? 'Rank name not available' : '';
            this.setState(state);
          //} else {
            // stop loading state
          //   state.isLoading = false;
          //   // show error message to user
          //   //state.error = err.message;
          //   state.error = "There is a problem with your chosen name";
          //   this.setState(state);
          // }
          // .then((exists) => {
          //
          // }).catch((err) => {
          //
          // });
          // set loading state while checking the contract
          //state.isLoading = true;
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
    // considered valid while loading as we don't know yet
    if (this.state.isLoading) return null;
    // check that we have at least 5 characters in the username
    const length = this.state.rankName.length;
    if (length === 0){
      if(this.state.rankingnameHasChanged) return 'error';
      return null;
    }
    if (length <= 5) return 'error';

    // don't allow '@' or spaces
    if(new RegExp(/[@\s]/gi).test(this.state.rankName)) return 'error';

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
    //const { newrankId } = this.props;
    //console.log('newrankId in create new ranking')
    //console.log(this.state.rankId)

    let validationState = this._getValidationState();
    let isValid = validationState === 'success' && !isLoading && !this.state.error;
    let feedback = isValid ? 'Rank name is available' : this.state.error || 'Rank names must be 6 or more characters and cannot include @ or spaces.';

    // if(!isLoading){
    //   //get a new rank Id ready
    //   //this.getNewRankId();
    // }

    if (!this.state.rankingnameHasChanged) feedback = '';

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
          <h2>Create A New Ranking Name</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <form onSubmit={ !isValid ? null : (e) => this._continueClick(e) }>
              <FieldGroup
                type="text"
                value={ this.state.rankName }
                disabled={ isLoading }
                placeholder="No gaps e.g. My_Club_Ladder - Must be unique. Cannot be changed!"
                onKeyPress={ (e) => e.key === '@' || e.key === ' ' ? e.preventDefault() : true }
                onChange={ (e) => this._handleChange(e) }
                name="rankName"
                autoComplete="off"
                label="Desired Ranking Name (Cannot Be Changed!)"
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
                value={ this.state.rankDescription }
                placeholder="Additional info e.g. Local ranking for our local club"
                onChange={(e) => this._handleChange(e)}
                name="rankDescription"
                label="Ranking Description"
              />
              <Button
                bsstyle="primary"
                disabled={ !isValid }
                onClick={ !isValid ? null : (e) => this._continueClick(e) }
                //onClick={ (e) => this._continueClick(e) }
              >
                { isLoading ? 'Loading...' : 'Create New Ranking' }
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
  //#endregion
}

//NB: this component copied from CreateUser.
//withRouter removed
//export default withRouter(CreateNewRanking);
export default CreateNewRanking;
