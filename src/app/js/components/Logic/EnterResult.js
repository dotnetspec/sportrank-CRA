//import { Link } from 'react-router-dom'
import { Button, FormGroup } from 'react-bootstrap';
//import testData from "../../json/Rankings.json";
import React, { Component } from 'react'
//import FieldGroup from './FieldGroup'
//import Spinner from 'react-spinkit'
import JSONops from './JSONops'
//import {contactNoCB, emailCB} from './App'

/**
 * Class that renders a form to allow the user to create
 * a challenge that is stored in the contract.
 *
 * @extends React.Component
 */

class EnterResult extends Component{

  //#region Constructor
  constructor(props, context) {
    super(props, context);

    //const data = this.props.data;
    //REVIEW: How is this line below supposed to work?
    //const { username, account, onAfterChallenge } = this.props;

    //REVIEW: to see the selectedOption change in console had to use an auxilary variabe
    //https://stackoverflow.com/questions/34974775/react-js-setstate-is-late-on-last-input
    //much of this code is redundant pertaining to the original app DoTweet functionality only
    this.selectedOption = "";
    // initial state
    this.state = {
      input: '',
      selection: [],
      //data,
      showModal: false,
      challenge: '',
      resultHasChanged: false,
      isLoading: false,
      error: '',
      selectedOption: 'undecided'
    };

    this.challengeInput = null;
    this._handleClick = this._handleClick.bind(this);
  }
  //#endregion

_processResult(resultEntered, currentUser){

//Handle the opponent's row being clicked as well as user's row
let checkedUserRank, checkedOpponentRank = 0;
const opponentCurrentlyChallengingUser = JSONops._getUserValue(this.props.data, currentUser, "CURRENTCHALLENGERNAME");

  checkedUserRank = JSONops._getUserValue(this.props.data, currentUser, "RANK");
  checkedOpponentRank = JSONops._getUserValue(this.props.data, opponentCurrentlyChallengingUser, "RANK");

             const currentUserRankInt = parseInt(checkedUserRank);
             const selectedOpponentRankInt = parseInt(checkedOpponentRank);

             if (resultEntered === 'undecided' ){
               JSONops._updateEnterResultUnchangedJSON(this.props.newrankId, currentUser,opponentCurrentlyChallengingUser, this.props.data);
               return "Thank you. No changes have been made. Your ranking is unchanged"
             }
             else if (resultEntered === 'won' && currentUserRankInt < selectedOpponentRankInt){
              JSONops._updateEnterResultUnchangedJSON(this.props.newrankId, currentUser,opponentCurrentlyChallengingUser, this.props.data);
              JSONops.updateDateStampsInJSON(this.props.newrankId, this.props.data, currentUser, opponentCurrentlyChallengingUser);
              console.log('result send to _updateEnterResultUnchangedJSON');
              return "Thank you. Your result has been entered. Your ranking is unchanged"

            }else if (resultEntered === 'lost' && currentUserRankInt > selectedOpponentRankInt){

              JSONops._updateEnterResultUnchangedJSON(this.props.newrankId, currentUser,opponentCurrentlyChallengingUser, this.props.data);
              JSONops.updateDateStampsInJSON(this.props.newrankId, this.props.data, currentUser, opponentCurrentlyChallengingUser);
              console.log('result send to _updateEnterResultUnchangedJSON');
              return "Thank you. Your result has been entered. Your ranking is unchanged"

            }else{
              JSONops._updateEnterResultJSON(this.props.newrankId, currentUser, checkedUserRank, opponentCurrentlyChallengingUser, checkedOpponentRank, this.props.data);
              JSONops.updateDateStampsInJSON(this.props.newrankId, this.props.data, currentUser,opponentCurrentlyChallengingUser);
              console.log('result send to _updateEnterResultJSON');
              return "Thank you. Your result has been entered. Your ranking has been changed"
            }
    }

  //#region Component events
  /**
   * Handles the 'challenge' button click event which
   * sends a transaction to the contract to store a
   * challenge for the current user.
   *
   * @returns {null}
   */

   //REVIEW: changed from fat arrow to avoid 'this'
   //obj reference issues (and used bind in the constructor)
  //_handleClick = async (e) => {
    _handleClick(e){
    try{
      //const result = this._processResult(this.selectedOption, this.props.user);
      this._processResult(this.selectedOption, this.props.user);
      // remove loading state
      this.setState({ isLoading: false });
      //clear the contact info
      this.props.contactNoCB('');
      this.props.emailCB('');
      // tell parent we've updated a user and to re-fetch user details from the contract
      //TODO: re-set below to onAfterReslt
      this.props.onAfterChallenge();
    }
    catch(err){
      // remove loading state and show error message
      this.setState({ isLoading: false, error: err.message });
    }
  }

   /**
   * When user changes an input value, record that in the state.
   *
   * @param {SyntheticEvent} cross-browser wrapper around the browser’s native event
   *
   * @return {null}
   */

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
    //return ((this.state.challenge === '' && !this.state.resultHasChanged) || (this.state.challenge.length > 0 && this.state.challenge.length <= 140)) ? null : 'error';
  }
  //#endregion

  //#region React lifecycle events
  componentDidMount(){
    // set focus to challenge textarea after render
    //if(this.challengeInput) this.challengeInput.focus();
  }


  setResult(e) {
    this.setState({ selectedOption: e.target.value });
    this.selectedOption = e.target.value;
    //console.log(`state: ${this.selectedOption}, value: ${e.target.value}`);
    //REVIEW: to work with this value need to use this.selectedOption
    //and not this.state.selectedOption
      console.log('Result is ...' + this.selectedOption);
      //this.setState({ showModal: false });
  }



  render(){
    //REVIEW: remove comments?
    //state is handled by DoChallenge now
    return (
<>
      <div onChange={event => this.setResult(event)}>
              <input type="radio" value="won" name="result"/> Won<p></p>
              <input type="radio" value="lost" name="result"/> Lost<p></p>
              <input type="radio" value="undecided" name="result"/> Undecided
      </div>
      <p></p>
      <form>
        <Button
          bsStyle="primary"
          //disabled={ !isValid || Boolean(error) || !resultHasChanged }
          //onClick={ (!isValid || Boolean(error) || !resultHasChanged) ? null : (e) => this._handleClick(e) }
          onClick={ (e) => this._handleClick(e) }
        >Post Result</Button>
        <FormGroup
          controlId="formBasicText"
          //validationState={ validationState }
        >
        </FormGroup>
      </form>
</>
    );
  }
  //#endregion
}
export default EnterResult
