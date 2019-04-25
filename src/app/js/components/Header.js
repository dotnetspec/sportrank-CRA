import { NavLink, withRouter } from 'react-router-dom'
//import { NavItem, Label, Button, Image, Modal, Navbar, ButtonToolbar, Dropdown, Overlay, Tooltip } from 'react-bootstrap';
import { Button, Image, Navbar, ButtonToolbar, Dropdown, Overlay, Tooltip, MenuItem } from 'react-bootstrap';

import React, { Component } from 'react';
//import DoChallenge from './DoChallenge';
//import Search from './Search';
import { formatEth, limitLength, limitAddressLength } from '../utils';
import Spinner from 'react-spinkit';
//import FieldGroup from './FieldGroup';
//import imgAvatar from '../../img/avatar-default.png';
import JSONops from './JSONops'
import {updateWarningText} from './Home'
//import {updatedExtAcctBalCB, newrankIdCB} from './App'
import {updatedExtAcctBalCB} from './App'
import web3 from '../../../web3';
//import { DropdownItem } from 'react-bootstrap';
//import DropdownItem from 'react-bootstrap/DropdownItem'
//import config from '../../../ABIaddress';


/**
 * Class displaying the accumulated ETH balance from
 *previous transactions
 *
 * @extends React.Component
 */
//CurrentETHBal works with callbacks in the parent (Header)
//to update the external account balance
//http://johnnyji.me/react/2015/06/26/why-setting-props-as-state-in-react-is-blasphemy.html
  class CurrentETHBal extends React.Component {
    constructor(props) {
      super(props);
      // no need to set state here because the balance is passed down
      //from the parent component through props (and re-set in DoChanllenge using callback)
      //updatedExtAcctBalCB(this.props.updatedExtAcctBalCB + 10 ** 18);

      updatedExtAcctBalCB(this.props.updatedExtAcctBalCB);
    }
    combineETHVals(){
      const origETHInt = parseInt(this.props.updatedExtAcctBalCB);
      //updatedExtAcctBalCB is updated by callback in Home
      //const newETHInt = parseInt(this.props.ExtAcctBalCB);
        //const combinedCurrentETHVal = origETHInt + newETHInt;
      return origETHInt;
    }
    render() {
      let htmlTxtToReturn = ''
      let htmlTxtToReturn2 = ''
      if(this.props.updatedExtAcctBalCB !== 0){
       htmlTxtToReturn = 'SportRank has contributed: '
       htmlTxtToReturn2 = this.combineETHVals() + " ETH to your favourite sport"
      }
      return(
        <div>
          <small>
            { htmlTxtToReturn }
            <br></br>
            { htmlTxtToReturn2 }
          </small>
        </div>
      );
    }
  }

/**
 * Class representing the header of the page that handles
 * commone functions such as navigation, searching of users,
 * link to create account, and modal to tweet
 *
 * @extends React.Component
 */
class Header extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      showTooltip: false
      //updatedExtAcctBalCB: 0
    };



  //#endregion

}

  //#region Component events
  /**
   * Hides the tweet modal
   */
  _handleClose() {
    this.setState({ showModal: false });

    updatedExtAcctBalCB = updatedExtAcctBalCB.bind(this);
  }



  /**
   * Switches to userupdate page
   TODO: Need something like below from DropdownItem so can
   pass e to 'handleShow' (which will become handleUpdateProfile)
   onSelect={(key, e) => this._handleAcctChange(e, key)}
   */
  _handleUpdateProfile(username) {
    if(username !== null){
      // redirect user to the profile update page
      this.props.history.push('/update/@' + username);
    }
    else {
      //create a new user
      this.props.history.push('/create');
    }
  }

  _handleDeactivatePlayer(username) {
    if(username !== null){
      //REVIEW: The naming of 'delete/deactivate' etc.
      // redirect user to the deactive player (currently named 'DeactivatePlayer') page
      this.props.history.push('/delete/@' + username);
    }
    else {
      //create a new user
      //TODO: add better handling here
      //this.props.history.push('/create');
    }
  }

  /**
   * Toggles the current account address tooltip
   */
  _handleToggle() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  /**
   * Handles the event when the user selects a different account from
   * the dropdown
   * @param {Event} e - the DOM event fired when the account was changed
   */
  _handleAcctChange(e) {
    if (e.target.tagName !== 'A') e.target = e.target.parentElement;
    web3.eth.defaultAccount = e.target.attributes.value.value;
    this.props.onAfterUserUpdate();
    if (e.target.attributes.username.value && JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, e.target.attributes.username.value)) {

      //update the text in the Home.js sibling warkingText
      updateWarningText('');
      //this used to be:
      //this.props.history.push('/update/@' + e.target.attributes.username.value);
      //if there's already a username just return to home page
      this.props.history.push('/');
    }
    else if (e.target.attributes.username.value){
      //update the text in the Home.js sibling warkingText
      updateWarningText('');
      //this.props.history.push('/update/@' + e.target.attributes.username.value);
    }
    else{
      //update the text in the Home.js sibling warkingText
      updateWarningText('');
      //create a new user
      this.props.history.push('/create');
    }
  }

  /**
   * Formats an ethereum balance for display
   * @param {*} balance to be formatted
   */
  _formatBalance(balance) {
    //trim middle set to false - looks better
    balance = formatEth(balance, 3)
    return 'Ξ' + limitLength(
      parseFloat(
        balance
      ).toFixed(4), 6, '', true
    );
  }


  _handleReactivatePlayer(user) {
    try {
      console.log('in _handleReactivatePlayer', this.props.newrankIdCB, this.props.rankingJSONdata, user, this.props.account)
      JSONops.reactivatePlayer(this.props.newrankIdCB, this.props.rankingJSONdata, user, this.props.account);
      this.props.history.push('/home/@' + user);
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  _handleCreateNewRanking(user) {
    try {
    //JSONops.reactivatePlayer(this.props.rankingJSONdata, user, this.props.account);
      this.props.history.push('/newranking/@' + user);
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  _handleRankingList(user) {
    try {
      //TODO: refactor?
      const {pathname} = this.props.location;
      console.log('pathname in _handleRankingList', pathname)
          // if(JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, this.props.user.username)
          //     ){
      //     if(pathname.includes("/sportrank/")){
      // //this.props.history.push('/userrankings/@' + user);
      //       this.props.history.push('/sportrank/');
      //     }else{
            this.props.history.push('/');
          //}
      //this.props.history.push('/@' + this.state.username);
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }



  navHomeOrToUserUpdate(){
    //TODO: display SportRank Home in white without small tag
    if(this.props.user.username !== ''){
      return  <NavLink exact to="/"><small>Sportrank HOME</small><small>Decentralized Sport</small></NavLink>
    }else{
      return <NavLink exact to="/create"><small>Sportrank HOME</small><small>Decentralized Sport</small></NavLink>
    }
  }

  // ifUserIsntInJsonGoToCreateUser(){
  //   //REVIEW: Had difficulty placing this code elsewhere without props.history undefined errors etc.
  //   //If the account user doesn't match any record in json go straight to create,
  //   //this is mainly useful for dev following Embark reset and json reset
  //   if(!JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, this.props.user)){
  //     console.log('isPlayerListedInJSON 1')
  //     //this.props.history.push('/create');
  //     //return <NavLink exact to="/create"><small>This account is not currently listed in this ranking. Click to join it?</small></NavLink>
  //   }
  // }

componentDidMount(){
console.log('header componentDidMount')
}

displayActivationBtns(){
  //console.log('displayActivationBtns', this.props.rankingJSONdata, this.props.user.username)
  const {pathname} = this.props.location;
  console.log('pathname', pathname)
      // if(JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, this.props.user.username)
      //     ){
      if(pathname.includes("home/@")){
        return(
          <>
          <Button bsStyle="primary" data-cy='deactivate' onClick={(e) => this._handleDeactivatePlayer(this.props.user[1])}>
            Deactivate Player
          </Button>
          <Button bsStyle="primary" data-cy='reactivate' onClick={(e) => this._handleReactivatePlayer(this.props.user[1])}>
            Reactivate Player
          </Button>
          </>
      )
    }else{ return null }
}


  //#endregion

  //#region React lifecycle events

  render() {

    //const { picture, username, usersRankingLists } = this.props.user;
    const { picture, username } = this.props.user;
    // console.log('usersRankingLists')
    // console.log(usersRankingLists)
    const isEditable = Boolean(username);
    const isError = this.props.error && this.props.error.message;
    const isLoading = !Boolean(this.props.account) && !isError;
    const tooltipProps = {
      container: this,
      target: this.tooltipTarget,
      show: this.state.showTooltip
    };

    let navClasses = [];
    if (isError) navClasses.push('error');
    if (!isEditable) navClasses.push('logged-out');

    console.log('header user name in account dropdown', this.props.userAccounts)

    // generate the DropdownItems for the accounts to populate
    // the accounts dropdown
    const accts = this.props.userAccounts.map((userAccount, index) => {
      const isCurrUser = userAccount.address === this.props.account;
      const hasUser = Boolean(userAccount.user.username);
        console.log('accts', accts)
        console.log('this.props.account', this.props.account)
        console.log('header address inside mapping of account dropdown', userAccount.address)
        console.log('header user name inside mapping of account dropdown', userAccount.user.username)
        console.log('index', index)
        console.log('isCurrUser', isCurrUser)

//NB: return is part of accts definition above. Not the render return (below)
      return <MenuItem
        key={index}
        eventKey={index}
        active={isCurrUser}
        value={userAccount.address}
        username={userAccount.user.username}
        onSelect={(key, e) => this._handleAcctChange(e, key)}
      >
        {hasUser ?
          <React.Fragment><Image
            src={userAccount.user.picture}
            alt={userAccount.user.username}
            width={30}
            circle
            className='profile'
          ></Image>
            <span className='username'>{userAccount.user.username}</span></React.Fragment>
          :
          <React.Fragment>

            <span className='address'>{limitAddressLength(userAccount.address, 4)}</span>
          </React.Fragment>
        }
        <React.Fragment>
          <small className='balance'>{this._formatBalance(userAccount.balance)}</small>
        </React.Fragment>
      </MenuItem>
    });

    let states = {};

    // state when we are waiting for the App component to finish loading
    // the current account (address) from web3.eth.getAccounts()
    states.isLoading = <Spinner name="pacman" color="white" fadeIn='none' />;

    states.isError = <span className='error'>ERROR!</span>;

    // state when our account has loaded, and it was determined that that
    // account (address) has not been mapped to an owner/user in the contract
    // (This happens in the App component)
    states.isNotEditable = <React.Fragment>
      <span className='profile-link'>
        {/*<Glyphicon glyph="question-sign" />*/}
        <span
          onMouseEnter={(e) => this._handleToggle(e)}
          onMouseLeave={(e) => this._handleToggle(e)}
          className='username'
          ref={(span) => this.tooltipTarget = span}
        >{limitAddressLength(this.props.account, 4)}
        </span>
      </span>
      <small className='balance'>{this._formatBalance(this.props.balance)}</small>
      <Overlay {...tooltipProps} placement="bottom">
        <Tooltip id="overload-bottom">{this.props.account}</Tooltip>
      </Overlay>
    </React.Fragment>;

    // state when our account has loaded, and it was determined that the
    // account (address) has been mapped to an owner/user in the contract
    // (This happens in the App component)
    states.isEditable = <React.Fragment>
      <span className='profile-link'>
        <Image
          src={picture}
          alt={username}
          width={60}
          circle
          className='profile'
        ></Image>
        <span className='username'>{username}</span>
      </span>
      <small className='balance'>{this._formatBalance(this.props.balance)}</small>
    </React.Fragment>;

    // state for showing the update profile button and challenge button modal
    //REVIEW: this used to be the tweet button and assoc Modal
    //potentially confusing - may need to move the code around so that relevant functionality
    //in same place
    //TODO: change to states.challenge

    states.challenge = <React.Fragment>
    <Button bsStyle="primary" data-cy='ListAllRankings' onClick={(e) => this._handleRankingList(this.props.user[1])}>
      List All Rankings
    </Button>
      <Button bsStyle="primary" data-cy='UpdateProfile' onClick={(e) => this._handleUpdateProfile(this.props.user[1])}>
        Update Profile
      </Button>
      {this.displayActivationBtns()}
      <Button bsStyle="primary" data-cy='CreateNewRanking' onClick={(e) => this._handleCreateNewRanking(this.props.user[1])}>
        Create New Ranking
      </Button>



      {/*<Modal show={this.state.showModal} onHide={(e) => this._handleClose(e)}>
        <Modal.Header closeButton>
          <Modal.Title>New tweet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoChallenge username={username} onAfterChallenge={(e) => this._handleClose()}></DoChallenge>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => this._handleClose(e)}>Close</Button>
        </Modal.Footer>
      </Modal>*/}
    </React.Fragment>;

    return (

      <Navbar collapseOnSelect className={navClasses.join(' ')}>
        <Navbar.Header>
          <Navbar.Brand>

            {this.navHomeOrToUserUpdate()}


            {isLoading ?
              states.isLoading
              :
              isError ?
                states.isError
                :

            <CurrentETHBal updatedExtAcctBalCB={this.props.updatedExtAcctBalCB}
            />
          }
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <div className='navbar-right'>
            <Navbar.Form>
             {/* <Search />*/}
            </Navbar.Form>

            {isLoading ?
              states.isLoading
              :
              isError ?
                states.isError
                :
                <React.Fragment>
                  <ButtonToolbar>
                    <Dropdown id="dropdown-accounts">
                      <Dropdown.Toggle>
                        {isEditable ?
                          states.isEditable
                          :
                          states.isNotEditable
                        }
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="accounts-list">
                        {accts}
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonToolbar>
                  {isEditable ? states.challenge : ''}
                </React.Fragment>
            }
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  //#endregion
}
export default withRouter(Header)
