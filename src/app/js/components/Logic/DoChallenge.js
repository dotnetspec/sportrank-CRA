//import { Link } from 'react-router-dom'
//import { Grid, Row, Col, PageHeader, Image, Modal, Navbar, ButtonToolbar, Dropdown, Glyphicon, DropdownItem, Overlay, Tooltip, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Button, FormGroup} from 'react-bootstrap';
//import testData from "../../json/Rankings.json";
import React, { Component, useState, useEffect } from 'react'
//import FieldGroup from './FieldGroup'
import Spinner from 'react-spinkit'
import JSONops from './JSONops'
//import {contactNoCB, emailCB} from './App'
//import sendmail from 'sendmail'
//import Fortmatic from 'fortmatic';
import web3 from '../../../../web3';
import DSportRank from '../../../../ABIaddress';
import { getWeb3defaultAccount } from '../SideEffects/io/web3defaultAccount';
import { getWeb3Accounts } from '../SideEffects/io/web3Accounts';
import { sendEthTransaction } from '../SideEffects/io/sendEthTransaction';
import { challengeSendToContract } from '../SideEffects/io/challengeSendToContract';
import { estimateGas } from '../SideEffects/io/estimateGas';


/**
 * Class that renders a form to allow the user to create
 * a challenge that is stored in the contract.
 *
 * @extends React.Component
 */

//class DoChallenge extends Component{
  export default function DoChallenge(props){


  //#region Constructor
  // constructor(props, context) {
  //   super(props, context);
    // initial state
    //this.state = {
      //selection: [],
      const [selection, setSelection] = useState([])
      //data: [],
      const [data, setData] = useState([])
      //showModal: false,
      const [showModal, setShowModal] = useState(false)
      //challenge: '',
      const [challenge, setChallenge] = useState('')
      //selectedOpponentName: "",
      const [selectedOpponentName, setSelectedOpponentName] = useState('')
      //challengeHasChanged: false,
      const [challengeHasChanged, setChallengeHasChanged] = useState(false)
      //isLoading: false,
      const [isLoading, setIsLoading] = useState(false)
      //error: '',
      const [error, setError] = useState('')
      //selectedChallengeOption: 'No'
      const [selectedChallengeOption, setSelectedChallengeOption] = useState('No')

      const [state, setState] = useState({
        challenge: ''
      })
    //};

    //challengeInput = '';
    const [challengeInput, setchallengeInput] = useState('')
  //}
  //#endregion



function displayContactDetails(){
  const oppoContactNumber = JSONops._getUserValue(props.data, props.selectedOpponentName, 'CONTACTNO')
  const oppoEmail = JSONops._getUserValue(props.data, props.selectedOpponentName, 'EMAIL')
  const oppoContactNumberTxt = props.selectedOpponentName + "'s contact number is : " + oppoContactNumber;
  const oppoEmailTxt = props.selectedOpponentName + "'s email address is : " + oppoEmail;

  //contactNoCB callback function (App.js)
  props.contactNoCB(oppoContactNumberTxt);
  props.emailCB(oppoEmailTxt);
  //contactNoCB callback function (Header.js)
  //let tempbalTodisplay = parseInt(this.props.updatedExtAcctBalCB) + (10 ** 18);
  //REVIEW: not sure what below relates to. Probably not useful ...
  // let tempXternAccountno = parseInt(this.props.updatedExtAcctBalCB)
  // //tempXternAccountno += 10 ** 18;
  // tempXternAccountno += 1;
  // updatedExtAcctBalCB(tempXternAccountno)
}

  //#region Component events
  /**
   * Handles the 'challenge' button click event which
   * sends a transaction to the contract to store a
   * challenge for the current user (functionality not complete).
   * Uses JSONops._updateDoChallengeJSON to updatae the json api
   *
   * @returns {null}
   */
  const _handleClick = async (e) => {
      console.log('in _handleClick');
      //NB: there is now no form to send
    // do not post challenge if there is a form error or user has not typed anything
    // if(this._getValidationState() === 'error' || !this.state.challengeHasChanged){
    //   console.log('here preventDefault');
    //   return e.preventDefault();
    // }

    // show loading state
    //setState({ isLoading: true });
    setIsLoading(true);
    //REVIEW: I don't see how these props from orig are used
    //const { username, account, onAfterChallenge } = this.props;
    //this.challengeInput = "at last!";
    //const sendETHDev = DSportRank.methods.sendETHDev();

    // using the callback
    //NB: we are not currently sending challenges to the blockchain
    //but updating the json and callback of the contactNoCB
    //REVIEW: think above comment out of date
    try{
      //https://stackoverflow.com/questions/27176838/reactjs-setstate-is-slow
      //await keyword necessary
      //let state = {};
      // await setState(state => {
      // state.challenge= props.user + " vs " + props.selectedOpponentName;
      //  }, ()=>{
      //    //after callback
      //    console.log('challenge', challenge)
      //  });
      //REVIEW: probably change naming of setState as that confuses with object components
      await setState(state.challenge = props.user + " vs " + props.selectedOpponentName);
       //const challenge = DSportRank.methods.challenge(this.state.challenge);
       // estimate gas before sending challenge transaction
       //const gasEstimate = await web3.eth.estimateGas({ from: web3.eth.defaultAccount });
      //const gasEstimate = await web3.eth.estimateGas({ from: getWeb3defaultAccount() });
      const gasEstimate = await estimateGas();
      console.log('gasEstimate 1', gasEstimate);
      async function callback(result) {
        //console.log('data', obj);
        await console.log('result', result)
      }
       //REVIEW; Sending ETH code. Account currently hard coded
      const resultSentExtBal = await sendEthTransaction(gasEstimate, callback);
      console.log('resultSentExtBal', resultSentExtBal)

       if (resultSentExtBal.status && !Boolean(resultSentExtBal.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
          //commented to get functional working for now ...
         //return setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(resultSentExtBal) });
       }
       console.log('gasEstimate', gasEstimate)
       //REVIEW: not currently sure why gasEstimate not working the same as for sendTransaction above
       //currently set with addon 10X higher
       //const result = await challenge.send({ from: web3.eth.defaultAccount, gas: gasEstimate + 100000 });
       //we're sending this challenge to the contract on Rinkeby:
       //const result = await challenge.send({ from: getWeb3Accounts(), gas: gasEstimate + 100000 });
       //const result = await challengeSendToContract(gasEstimate + 100000, challenge);
       // function callback(result){
       //   console.log('result', result)
       // }
       // async function callback(result) {
       //   //console.log('data', obj);
       //   await console.log('result', result)
       // }
       //const result =  sendChallengeToContract(gasEstimate + 100000, challenge, callback);
       console.log('props.newrankIdCB, props.user, props.selectedOpponentName, props.data', props.newrankIdCB)
       //result should be a trxhash
       // check result status. if status is false or '0x0', show user the tx details to debug error

      // if (result.status && !Boolean(result.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
      //   console.log('if result', result)
      //   //commented to get funcitonal working for now ...
      //   //return setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
      // }
      //REVIEW: Update must come after sendTransaction() in case e.g. there's not enough gas
      //otherwise, if this goes through there could be ranking errors etc.
      JSONops._updateDoChallengeJSON(props.newrankIdCB, props.user, props.selectedOpponentName, props.data);
      displayContactDetails();
      // remove loading state
      //setState({ isLoading: false });
      setIsLoading(false);
      // tell parent we've updated a user and to re-fetch user details from the contract
      props.closeModalOnAfterChallenge();
      //QUESTION: is this the right place for this function?

    }
    catch(err){
      //console.log(result)
      console.log(err)
      // remove loading state and show error message
      //setState({ isLoading: false, error: err.message });
      setIsLoading(false);
      setError(err.message)
    }
  }

   /**
   * When user changes an input value, record that in the state.
   *
   * @param {SyntheticEvent} cross-browser wrapper around the browser’s native event
   *
   * @return {null}
   */
  function _handleChange(e) {
    //REVIEW: line below was original but not working
    //changed to working code below for challengeHasChanged
    //let state = {challengeHasChanged: true};
    //state[e.target.name] = e.target.value;
    //setState(state);
    //setState({ challenge: e.target.value });
    setChallenge(e.target.value)
    //setState({ challengeHasChanged: true });
    setChallengeHasChanged(true);
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
  function _getValidationState() {
    return ((challenge === '' && !challengeHasChanged) || (challenge.length > 0 && challenge.length <= 140)) ? null : 'error';
  }
  //#endregion

  //#region React lifecycle events
  // function componentDidMount(){
  //   // set focus to challenge textarea after render
  //   if(challengeInput) challengeInput.focus();
  // }

  useEffect(() => {
    if(challengeInput) challengeInput.focus();
}, [])

  //render(){
    //const userAccountNo = web3.eth.defaultAccount;
    let states = {};
    // state when we are waiting for the App component to finish loading
    // the current account (address) from web3.eth.getAccounts()
    states.isLoading = <Spinner name="pacman" color="white" fadeIn='none' />;
    states.isError = <span className='error'>ERROR!</span>;
    //determine userName from account no. stored in JSON
    //with getUserNameFromAccount(userName)
    const validationState = _getValidationState();
    //const isValid = validationState !== 'error';
    //const { isLoading, error, challenge, challengeHasChanged } = state
    //const { isLoading } = state;

    // let feedback = !isValid ? 'challenge details must be 140 characters or less' : '';
    // if(state.error){feedback = error};
    // let placeholderText = "Please write contact details and suggested court location(s)/time(s)/date(s) you would like to send to ";
    // placeholderText += props.selectedOpponentName;
    // placeholderText += " here:";

    return (
      <>
      <form>
        {/* REVIEW: Re-enable this challenge functionality? */}
      {/*
        <FieldGroup
          type="text"
          value={ challenge }
          placeholder= {placeholderText}
          onChange={ (e) => _handleChange(e) }
          name="Information"
          componentClass="textarea"
          hasFeedback={true}
          validationState={validationState}
          inputRef={(input) => { challengeInput = input; }}
        />
        */}
        {/* REVIEW: Re-enable this validation functionality? */}

        <Button
          bsStyle="primary"
          // disabled={ !isValid || Boolean(error) || !challengeHasChanged }
          // onClick={ (!isValid || Boolean(error) || !challengeHasChanged) ? null : (e) => _handleClick(e) }
            onClick={ (e) => _handleClick(e) }
            //onClick={ () => onClickSendEmail() }
        >{isLoading ? 'Loading...' : 'Post Challenge'}</Button>
        <FormGroup
          controlId="formBasicText"
          validationState={ validationState }
        >
        </FormGroup>
      </form>
      </>
    );
  //}
  //#endregion
}

//declare this outside the DoChallenge function (if want to export for tests)
//just giving the function a different name so it can be mocked
export const sendChallengeToContract = async (gasEstimate, challenge) => {
    return challengeSendToContract(gasEstimate, challenge);
  }
