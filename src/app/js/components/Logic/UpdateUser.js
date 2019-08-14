import { Grid, Button, FormGroup, Image, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react';
import FieldGroup from '../UI/FieldGroup';
import JSONops from './JSONops'
import { isEmpty } from '../../utils';
//import {updatedUserSendToContract} from '../SideEffects/io/updatedUserSendToContract'
//import {estimateGas} from '../SideEffects/io/estimateGas'
//import DSportRank from '../../../../ABIaddress';
import web3 from '../../../../web3';
import { estimateGas } from '../SideEffects/io/estimateGas';
//import { getWeb3Accounts } from '../SideEffects/io/web3Accounts';
import { updateUserSendToContract } from '../SideEffects/io/updateUserSendToContract';
//import Grid from 'react-bootstrap/Grid'
//import PageHeader from 'react-bootstrap/PageHeader'

class UpdateUser extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);

    // initial state
    this.state = {
      isLoading: false,
      picture: '',
      description: this.props.user.description,
      error: '',
      formState: null,
      formUpdated: false,
      contactno: JSONops._getUserValue(this.props.rankingJSONdata, this.props.user.username, "CONTACTNO"),
      email: JSONops._getUserValue(this.props.rankingJSONdata, this.props.user.username, "EMAIL")
    };
  }
  //#endregion

//REVIEW: Currently not used
//apparently: Had to change below to cover no player in json but account active
  uploadUserProfilePic(){
    //REVIEW: this json code is added here to remove it from _handleClick from where it originated
    //if the ployer account name isn't yet listed as a 'NAME' in the json (should be just a dev issue)
    //caused by deleting accounts for dev purposes
    //update 12 Mar 2019: I do not see what this is used for as update ops are against the bc not a json file
    //delete after a while
    //
    // if (!JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, user.username)){
    //     JSONops.createNewUserInJSON(this.props.rankingJSONdata, user.username, this.props.account, this.state.description, this.props.newrankId);
    //     this.props.history.push('/');
    // }
    // // OPTIMIZE:
    // else{
    //   console.log('user.username')
    //   console.log(user.username)
    //   console.log('his.state.contactno')
    //   console.log(this.state.contactno)
    //   console.log('this.state.email')
    //   console.log(this.state.email)
    //
    //   JSONops.updateUserInJSON(this.props.newrankId, this.props.rankingJSONdata, user.username, this.state.contactno, this.state.email, this.state.description);
    // }

    //REVIEW: currently unused legacy user profile pic upload code
    //this.uploadUserProfilePic();

        // if the user has updated their photo, try to upload it to ipfs
        // and use the resulting ipfs hash to send to the contract as part
        // of the user's profile.
        //let hash = '';
        if (this.state.picture !== '') {
          try {
            // upload the file to ipfs and get the resulting hash
            //hash = await EmbarkJS.Storage.uploadFile([this.inputPicture]);
            //   user.picture = user.picture.length > 0 ? EmbarkJS.Storage.getUrl(user.picture) : imgAvatar;
            // hash = '';
          }
          catch (err) {
            // stop loading state and show user the error
            return this.setState({ isLoading: false, formState: 'error', error: err.message });
          }
          this.props.history.push('/');
        }
  }

//REVEIW: not currenlty used - it appears the 'update' wasn't even talking to the BC
//apparently it makes little sense to store this kind of user data on a BC
//and it was done just for the sake of the original demo code. This function will
//probably be deleted.
//But I don't have anywhere else to add it!
  //
  async useBCToAddUpdatedUserVals(){
    console.log('in useBCToAddUpdatedUserVals');
    try {
      // if the form has not been updated, do nothing
      //if (!this.state.formUpdated) return;
      //const usernameHash = web3.utils.keccak256(this.props.user.username);
      const updatedDescription = this.state.description;
      console.log('updatedDescription', updatedDescription);
      //TODO: dummy value - This needs to be fully implemented with IPFS
      const updatedImageHash = 'Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL';
      //ensure defaultRankid isn't altered by updating the user
      const placeHolderForRankId = '';
      // set up our contract method with the input values from the form
          // const editAccount = DSportRank.methods.editAccount(usernameHash, updatedDescription, placeHolderForRankId, updatedImageHash);
          // // get a gas estimate before sending the transaction
          // //nxt 2 lines commented to avoid compile err
          // //const gasEstimate = await editAccount.estimateGas({ from: web3.eth.defaultAccount, gas: 10000000000 });
          // const account = await getWeb3Accounts();
          const gasEstimate = await estimateGas();
          // //const result = await editAccount.send({ from: web3.eth.defaultAccount,  gas: gasEstimate + 1000 });
          // const result = await editAccount.send({ from: account,  gas: gasEstimate + 1000 });
          // console.log('result', await result);

          const result = updateUserSendToContract(gasEstimate, updatedDescription, placeHolderForRankId, updatedImageHash)

          if (result.status && !Boolean(result.status.toString().replace('0x', ''))) {
            console.log('inside the if')
            return this.setState({ isLoading: false, formState: 'error', formUpdated: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
          }
      //console.log('here after contract should have updated', this.state.error)
      // stop loading state, and render the form as successful
      this.setState({ isLoading: false, formState: 'success', formUpdated: false });

      //NB: below prevents onAfterUserUpdate
      this.props.history.push('/');

      // tell parent we've updated our user, so the current
      // user is re-fetched to get the user's details
      //REVIEW: return here?
      this.props.onAfterUserUpdate();
      return null;

      //return to home page
      //this.props.history.push('/');
    }
    catch (err) {
      console.log('here in the err', err)
      // stop loading state and show user the error
      this.setState({ isLoading: false, formState: 'error', formUpdated: false, error: err.message });
    }
  }

  //#region Component events
  /**
   * Handles the 'Update user' button click event which
   * sends json to update the
   * user's profile.
   *
   * @returns {null}
   */
  _handleClick = async (e, username) => {
    //console.log('update error', e)
    //this.setState({error:true});
    //const { account, user } = this.props;
    //const { description } = this.state;

    this.useBCToAddUpdatedUserVals();
    //REVIEW:
    // if the form has not been updated, do nothing
    //if (!this.state.formUpdated) return;
    //const newValAddedJson = JSONops._setUserValue(jsonObj, username, description, newValue)
    //const gasEstimate = estimateGas();

    //REVEIW: below was if using a  separate updatedUserSendToContract file for mocking
    //may return to this approach
    //usernameHash, updatedDescription, newrankId, updatedImageHash
    // const result = updatedUserSendToContract(gasEstimate, description, newrankId, this.state.picture)
    // if (result.status && !Boolean(result.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
    //   return this.setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
    // }
    // show loading state
    //this.setState({ isLoading: true });
      //this.props.history.push('/');

    this.setState({ isLoading: false });
    return null;
  }

  /**
   * When user changes an input value, record that in the state.
   * Additionally, sets state that the form has been updated to
   * allow for more fine validation control
   *
   * @param {SyntheticEvent} cross-browser wrapper around the browser’s native event
   *
   * @return {null}
   */
  _handleChange(e) {
    let state = { formUpdated: true };
    const input = e.target.name;
    const value = e.target.value;

    state[input] = value;

    this.setState(state);
  }

//QUESTION; Why was it necessary to send this.props.user[1] as a parameter
//to this function and not just use this.props.user (which is seen as an object by JSONops.reactivatePlayer)?
  _handleReactivatePlayer(user) {
    try {
    JSONops.reactivatePlayer(this.props.rankingJSONdata, user, this.props.account);
      this.props.history.push('/');
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  _cancelClick(e) {
    try {
    this.props.onAfterUserUpdate();
    this.props.history.push('/');
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  //#endergion

  //#region React lifecycle events
  //REVIEW: not sure what this is doing
  componentDidUpdate(prevProps){
    if(this.props.user.description !== prevProps.user.description){
      this.setState({description: this.props.user.description});
    }
  }

  componentDidMount(){
    // const { user } = this.props;
    // console.log('this.props.rankingJSONdata')
    // console.log(this.props.rankingJSONdata)
    // console.log('user.username')
    // console.log(user.username)
    //
    // let contactno = JSONops._getUserValue(this.props.rankingJSONdata, user.username, "CONTACTNO");
    // this.setState({contactno: contactno});
    // //console.log(this.state.contactno)
    // let email = JSONops._getUserValue(this.props.rankingJSONdata, user.username, "EMAIL");
    // this.setState({email: email});
    //console.log(this.state.email)
  }

  render() {
    const { isLoading, formState, formUpdated, contactno, email, description, picture } = this.state;
    const { user } = this.props;
    //const feedback = formState === 'success' ? 'Saved' : error;
    //console.log('rendering updateUser error', this.state.error)
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>Update { user.username } <small>{this.props.account}</small></h2>
          </Col>
        </Row>
        {isEmpty(this.state.error) ? null : <span className='error'>Oh no!</span>}
        <p></p>
        <Row className="show-Grid">
          <Col xs={12} >
            <Button
              bsStyle="primary"
              //disabled={ !isValid }
              //onClick={ !isValid ? null : (e) => this._handleClick(e) }
              onClick={ (e) => this._cancelClick(e) }
            >
            { isLoading ? 'Loading...' : 'Cancel' }
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <form
            className="updateForm"
            onSubmit={ isLoading || !formUpdated ? null : (e) => this._handleClick(e) }>
              <FieldGroup
                className="username"
                type="text"
                value={ user.username }
                disabled={true}
                name="username"
                label="Player Name"
              />
              <FieldGroup
                className="contactno"
                autoFocus
                type="text"
                value={ this.props.userAccounts[0].user.contactno }
                placeholder="Your Contact Number"
                onChange={ (e) => this._handleChange(e) }
                name="contactno"
                label="Contact Number"
                validationState={ formState }
              />
              <FieldGroup
                className="email"
                type="text"
                value={ this.props.userAccounts[0].user.email }
                placeholder="Your Email"
                onChange={ (e) => this._handleChange(e) }
                name="email"
                label="Email"
                validationState={ formState }
              />
              <FieldGroup
                className="description"
                type="text"
                value={ description }
                placeholder="Grade, availability etc."
                onChange={ (e) => this._handleChange(e) }
                name="description"
                label="Player Details"
                validationState={ formState }
              />
              <FieldGroup
                type="file"
                value={ picture }
                onChange={ (e) => this._handleChange(e) }
                name="picture"
                label="Profile picture (PLEASE IGNORE - THIS FEATURE IS NOT FULLY IMPLEMENTED IN ALPHA)"
                inputRef={ (input) => this.inputPicture = input }
                validationState={ formState }
              />
              <FormGroup>
                {/* user.picture.length ? <Image src={ user.picture } width="100" circle /> : '' */}
              </FormGroup>
              <FormGroup>
                <Button
                  className="updateProfileBtn"
                  bsStyle="primary"
                  // disabled={ isLoading || !formUpdated }
                  // onClick={ isLoading || !formUpdated ? null : (e) => this._handleClick(e) }
                  onClick={ (e) => this._handleClick(e, user.username) }
                >
                  { isLoading ? 'Loading...' : 'Update Profile' }
                </Button>
              </FormGroup>
              <FormGroup
                validationState={ formState }
              >

              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
  //#endregion
}

export default withRouter(UpdateUser);
