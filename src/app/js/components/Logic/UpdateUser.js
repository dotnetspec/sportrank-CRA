import {
  Grid,
  Button,
  FormGroup,
  Col,
  Row
} from 'react-bootstrap';
import {
  withRouter
} from 'react-router-dom'
import React, {
  Component
} from 'react';
import FieldGroup from '../UI/FieldGroup';
import JSONops from './JSONops'
import {
  isEmpty
} from '../../utils';
//import {updatedUserSendToContract} from '../SideEffects/io/updatedUserSendToContract'
//import {estimateGas} from '../SideEffects/io/estimateGas'
//import DSportRank from '../../../../ABIaddress';
//import web3 from '../../../../web3';
//import { estimateGas } from '../SideEffects/io/estimateGas';
//import { getWeb3Accounts } from '../SideEffects/io/web3Accounts';
import {
  updateUserSendToContract
} from '../SideEffects/io/updateUserSendToContract';
import MMWaitModal from '../UI/Modals/MMWaitModal';
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
      //contactno: JSONops._getUserValue(this.props.rankingJSONdata, this.props.user.username, "CONTACTNO"),
      //email: JSONops._getUserValue(this.props.rankingJSONdata, this.props.user.username, "EMAIL"),
      contactno: this.props.user.contactno,
      email: this.props.user.email,
      showModal: false
    };
    this.closeModalCB = this.closeModalCB.bind(this);
  }
  //#endregion

  //for sending to the modal
  showModal() {
    this.setState({
      showModal: true
    });
  }

  closeModalCB() {
    //update the new details display.
    this.props.setuserCB(this.props.user, this.props.username, this.state.contactno, this.state.email, this.state.description);
    this.props.history.push('/');
  }

  async useBCToAddUpdatedUserVals() {
    console.log('in useBCToAddUpdatedUserVals');
    try {
      const updatedDescription = this.state.description;
      const updatedContactno = this.state.contactno;
      const updatedEmail = this.state.email;
      //TODO: dummy value - This needs to be fully implemented with IPFS
      const updatedImageHash = 'Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL';
      //ensure defaultRankid isn't altered by updating the user
      const placeHolderForRankId = '';;
      const result = updateUserSendToContract(this.props.account.owner, updatedContactno, updatedEmail, updatedDescription, placeHolderForRankId, updatedImageHash, updateUserSendToContractCB);
      //use CB to wait for the result to come back and update the page
      async function updateUserSendToContractCB() {
        JSONops.updateUserInJSON(this.props.newrankId, this.props.rankingJSONdata, this.props.user.username, this.state.contactno, this.state.email, this.state.description);
      }
      if (result.status && !Boolean(result.status.toString().replace('0x', ''))) {
        console.log('inside the if')
        return this.setState({
          isLoading: false,
          formState: 'error',
          formUpdated: false,
          error: 'Error executing transaction, transaction details: ' + JSON.stringify(result)
        });
      }
      // stop loading state, and render the form as successful
      this.setState({
        isLoading: false,
        formState: 'success',
        formUpdated: false,
        showModal: true
      });
      return null;
    } catch (err) {
      console.log('here in the err', err)
      // stop loading state and show user the error
      this.setState({
        isLoading: false,
        formState: 'error',
        formUpdated: false,
        error: err.message
      });
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
    this.useBCToAddUpdatedUserVals();
    this.setState({
      isLoading: false
    });
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
    let state = {
      formUpdated: true
    };
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
      this.props.history.push('/');
    } catch (err) {
      // stop loading state and show the error
      console.log(err.message);
    };
  }
  //#endergion
  //#region React lifecycle events
  //REVIEW: not sure what this is doing
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({
        description: this.props.description
      });
    }
  }

  render() {
    const {
      isLoading,
      formState,
      formUpdated,
      contactno,
      email,
      description,
      picture
    } = this.state;
    const {
      user
    } = this.props;
    //const feedback = formState === 'success' ? 'Saved' : error;
    return ( <
      div >
      <
      MMWaitModal show = {
        this.state.showModal
      }
      closeModalCB = {
        this.closeModalCB
      } > < /MMWaitModal> <
      Grid >
      <
      Row >
      <
      Col xs = {
        12
      } >
      <
      h2 > Update {
        user.username
      } < small > {
        this.props.account.owner
      } < /small></h2 >
      <
      /Col> <
      /Row> {
        isEmpty(this.state.error) ? null : < span className = 'error' > Oh no! < /span>} <
          p > < /p> <
          Row className = "show-Grid" >
          <
          Col xs = {
            12
          } >
          <
          Button
        bsStyle = "primary"
        //disabled={ !isValid }
        //onClick={ !isValid ? null : (e) => this._handleClick(e) }
        onClick = {
            (e) => this._cancelClick(e)
          } >
          {
            isLoading ? 'Loading...' : 'Cancel'
          } <
          /Button> <
          /Col> <
          /Row> <
          Row >
          <
          Col xs = {
            12
          } >
          <
          form
        className = "updateForm"
        onSubmit = {
            isLoading || !formUpdated ? null : (e) => this._handleClick(e)
          } >
          <
          FieldGroup
        className = "username"
        type = "text"
        value = {
          user.username
        }
        disabled = {
          true
        }
        name = "username"
        label = "Player Name" /
          >
          <
          FieldGroup
        className = "contactno"
        autoFocus
        type = "text"
        //value={ this.props.userAccounts[0].user.contactno }
        value = {
          contactno
        }
        placeholder = "Your Contact Number"
        onChange = {
          (e) => this._handleChange(e)
        }
        name = "contactno"
        label = "Contact Number"
        validationState = {
          formState
        }
        /> <
        FieldGroup
        className = "email"
        type = "text"
        //value={ this.props.userAccounts[0].user.email }
        value = {
          email
        }
        placeholder = "Your Email"
        onChange = {
          (e) => this._handleChange(e)
        }
        name = "email"
        label = "Email"
        validationState = {
          formState
        }
        /> <
        FieldGroup
        className = "description"
        type = "text"
        value = {
          description
        }
        placeholder = "Grade, availability etc."
        onChange = {
          (e) => this._handleChange(e)
        }
        name = "description"
        label = "Player Details"
        validationState = {
          formState
        }
        /> <
        FieldGroup
        type = "file"
        value = {
          picture
        }
        onChange = {
          (e) => this._handleChange(e)
        }
        name = "picture"
        label = "Profile picture (PLEASE IGNORE - THIS FEATURE IS NOT FULLY IMPLEMENTED IN ALPHA)"
        inputRef = {
          (input) => this.inputPicture = input
        }
        validationState = {
          formState
        }
        /> <
        FormGroup > {
            /* user.picture.length ? <Image src={ user.picture } width="100" circle /> : '' */ } <
          /FormGroup> <
          FormGroup >
          <
          Button
        className = "updateProfileBtn"
        bsStyle = "primary"
        // disabled={ isLoading || !formUpdated }
        // onClick={ isLoading || !formUpdated ? null : (e) => this._handleClick(e) }
        onClick = {
            (e) => this._handleClick(e, user.username)
          } >
          {
            isLoading ? 'Loading...' : 'Update Profile'
          } <
          /Button> <
          /FormGroup> <
          FormGroup
        validationState = {
            formState
          } >

          <
          /FormGroup> <
          /form> <
          /Col> <
          /Row> <
          /Grid> <
          /div>
      );
    }
    //#endregion
  }

  export default withRouter(UpdateUser);
