import { NavLink, withRouter } from 'react-router-dom'
//import { NavItem, Label, Button, Image, Modal, Navbar, ButtonToolbar, Dropdown, Overlay, Tooltip } from 'react-bootstrap';
import { Button, Image, Navbar, ButtonToolbar, Dropdown, Overlay, Tooltip, MenuItem } from 'react-bootstrap';
import React, { Component } from 'react';
//import { formatEth, limitLength,limitAddressLength } from '../../utils';
import { limitAddressLength } from '../../utils';
import Spinner from 'react-spinkit';
import JSONops from '../Logic/JSONops';
//import {updateWarningText} from '../Logic/Home'
//import {updatedExtAcctBalCB} from '../Logic/App'
import web3 from '../../../../web3';
import PlayerStatusBtn from './buttons/PlayerStatusBtn';
import ListAllRankingsBtn from './buttons/ListAllRankingsBtn';
import {formatBalance} from '../../utils';
import CurrentETHBal from './Currentethbal'
/**
 * Class displaying the accumulated ETH balance from
 *previous transactions
 *
 * @extends React.Component
 */

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
      showTooltip: false,
      playerActive: true,
      specificRankingOptionBtns: false
      //updatedExtAcctBalCB: 0
    };
//this.handleChildClick = this.handleChildClick.bind(this)
  //#endregion
}

  //#region Component events
  /**
   * Hides the tweet modal
   */
  _handleClose() {
    this.setState({ showModal: false });
    //REVIEW: unable to see why this is necessary:
    //updatedExtAcctBalCB = updatedExtAcctBalCB.bind(this);
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

  /**
   * Toggles the current account address tooltip
   */
  _handleToggle() {
    //console.log('_handleToggle')
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  /**
   * Handles the event when the user selects a different account from
   * the dropdown
   * @param {Event} e - the DOM event fired when the account was changed
   */

  _handleAcctChange(e) {
    //console.log('account change')
    if (e.target.tagName !== 'A') e.target = e.target.parentElement;
    web3.eth.defaultAccount = e.target.attributes.value.value;
    this.props.onAfterUserUpdate();
    if (e.target.attributes.username.value && JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, e.target.attributes.username.value)) {

      //update the text in the Home.js sibling warkingText
      //updateWarningText('');
      //this used to be:
      //this.props.history.push('/update/@' + e.target.attributes.username.value);
      //if there's already a username just return to home page
      this.props.history.push('/');
    }
    //REVIEW: Nothing happening here ...
    else if (e.target.attributes.username.value){
      //update the text in the Home.js sibling warkingText
      //updateWarningText('');
      //this.props.history.push('/update/@' + e.target.attributes.username.value);
    }
    else{
      //update the text in the Home.js sibling warkingText
      //updateWarningText('');
      //create a new user
      this.props.history.push('/create');
    }
  }

  // /**
  //  * Formats an ethereum balance for display
  //  * @param {*} balance to be formatted
  //  */
  // formatBalance(balance) {
  //   //trim middle set to false - looks better
  //   balance = formatEth(balance, 3)
  //   return 'Ξ' + limitLength(
  //     parseFloat(
  //       balance
  //     ).toFixed(4), 6, '', true
  //   );
  // }

  _handleReactivatePlayer(user) {
    try {
      //console.log('in _handleReactivatePlayer', this.props.newrankIdCB, this.props.rankingJSONdata, user, this.props.account)
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
      //console.log('pathname in _handleRankingList', pathname)
          // if(JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, this.props.user.username)
          //     ){
      //     if(pathname.includes("/sportrank/")){
      // //this.props.history.push('/userrankings/@' + user);
      //       this.props.history.push('/sportrank/');
      //     }else{
      //REVIEW: Better naming for onChildClick
            this.props.onListAllChildClick();
            this.props.history.push('/');
          //}
      //this.props.history.push('/@' + this.state.username);
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }

  navHomeOrToUserUpdate(){
    console.log('navHomeOrToUserUpdate');
    //TODO: display SportRank Home in white without small tag
    if(this.props.user.username !== ''){
      return  <NavLink exact to="/"><small>Sportrank HOME</small><small>Decentralized Sport</small></NavLink>
    }else{
      return <NavLink exact to="/create"><small>Sportrank HOME</small><small>Decentralized Sport</small></NavLink>
    }
  }

  //Using functions for the fragments to make them easier to understand than multiple
  //ternary operators etc...

  renderIsNotEditableFragmanet(){

    const tooltipProps = {
      container: this,
      target: this.tooltipTarget,
      show: this.state.showTooltip
    };

    return(<React.Fragment>
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
      <small className='balance'>{formatBalance(this.props.balance)}</small>
      <Overlay {...tooltipProps} placement="bottom">
        <Tooltip id="overload-bottom">{this.props.account}</Tooltip>
      </Overlay>
    </React.Fragment>);
  }

  renderHasUserFragment(userAccount){
    return(
      <React.Fragment><Image
      src={userAccount.user.picture}
      alt={userAccount.user.username}
      width={30}
      circle
      className='profile'
      ></Image>
      <span className='username' data-cy='usernameinprofile' data-testid="usernameinprofile">{userAccount.user.username}</span>
      </React.Fragment>
    )
  }

  renderNoUserFragment(userAccount){
      return(<React.Fragment>
        <span className='address'>{limitAddressLength(userAccount.address, 4)}</span>
      </React.Fragment>
    )
  }

  renderBasedOnUserExists(userAccount){
    //console.log('renderBasedOnUserExists')
    const hasUser = Boolean(userAccount.user.username);
    return hasUser ?
      this.renderHasUserFragment(userAccount)
      :
      this.renderNoUserFragment(userAccount)
  }

  renderAMenuItem(userAccount, index){
    //console.log('menuitem')
    const isCurrUser = userAccount.address === this.props.account;
    return(
        <MenuItem
        key={index}
        eventKey={index}
        active={isCurrUser}
        value={userAccount.address}
        username={userAccount.user.username}
        onSelect={(key, e) => this._handleAcctChange(e, key)}
      >
        {this.renderBasedOnUserExists(userAccount)}
        <React.Fragment>
          <small className='balance'>{formatBalance(userAccount.balance)}</small>
        </React.Fragment>
      </MenuItem>
    )
  }

  mapAndRenderUserAccounts(){
    //console.log('mapAndRenderUserAccounts', this.props.userAccounts)
    // generate the DropdownItems for the accounts to populate
    // the accounts dropdown
  return this.props.userAccounts.map((userAccount, index) => {
    //console.log('mapAndRenderUserAccounts')
      return this.renderAMenuItem(userAccount, index);
    });
  }

  renderIsEditableFragment(picture, username){
    return(
      <React.Fragment>
        <span className='profile-link'>
          <Image
            src={picture}
            alt={username}
            width={60}
            circle
            className='profile'
          ></Image>
          <span className='username' data-cy='usernameinprofilelink'>{username}</span>
        </span>
        <small className='balance'>{formatBalance(this.props.balance)}</small>
      </React.Fragment>
    )
  }

  renderChallengeFragment(){
    return(
      <React.Fragment>
      <ListAllRankingsBtn data-testid='ListAllRankings' onListAllChildClick={this.props.onListAllChildClick}/>
        <Button bsStyle="primary" data-cy='UpdateProfile' data-testid='UpdateProfile' onClick={(e) => this._handleUpdateProfile(this.props.user[1])}>
          Update Profile
        </Button>
        {this.displayActivationBtns()}
        <Button bsStyle="primary" data-cy='CreateNewRanking' onClick={(e) => this._handleCreateNewRanking(this.props.user[1])}>
          Create New Ranking
        </Button>
      </React.Fragment>
    )
  }

  determineStatesForDisplay(){
    const { picture, username } = this.props.user;
    let states = {};
    // state when we are waiting for the App component to finish loading
    // the current account (address) from web3.eth.getAccounts()
    states.isLoading = <Spinner name="pacman" color="white" fadeIn='none' />;
    states.isError = <span className='error'>ERROR!</span>;
    // state when our account has loaded, and it was determined that that
    // account (address) has not been mapped to an owner/user in the contract
    // (This happens in the App component)
    states.isNotEditable = this.renderIsNotEditableFragmanet();
    // state when our account has loaded, and it was determined that the
    // account (address) has been mapped to an owner/user in the contract
    // (This happens in the App component)
    states.isEditable = this.renderIsEditableFragment(picture, username);
    //REVIEW: this used to be the tweet button and assoc Modal
    //potentially confusing - may need to move the code around so that relevant functionality
    //in same place
    states.challenge = this.renderChallengeFragment();
    return states;
  }

  handleRenderErrorOrCurrentEthBal(states){
    const isError = this.props.error && this.props.error.message;
    console.log('handleRenderErrorOrCurrentEthBal iserror?', isError);
    return isError ?
      states.isError
      :
      <CurrentETHBal data-testid='CurrentETHBal' updatedExtAcctBalCB={this.props.updatedExtAcctBalCB}
      />
  }

  renderNavbarHeader(isLoading, states){
    console.log('renderNavbarHeader isLoading', isLoading);
    return(
      <Navbar.Header>
      <Navbar.Brand>
        {isLoading ? states.isLoading : this.handleRenderErrorOrCurrentEthBal(states)}
        {this.navHomeOrToUserUpdate()}
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    )
  }

  renderNavbarCollapse(isLoading, states, isEditable, isError){
    return(
    <Navbar.Collapse>
      <div className='navbar-right'>
        <Navbar.Form>
         {/* <Search />*/}
        </Navbar.Form>
        {this.handleDropDownIsLoadingOrRender(isLoading,isError, isEditable, states)}
      </div>
    </Navbar.Collapse>
    )
  }

  handleRenderErrorOrDropDownCollapse(isError, isEditable, states){
    //console.log('handleRenderErrorOrDropDownCollapse')
    return isError ? states.isError : this.renderDropDownCollapseNoError(isEditable, states)
  }

  renderDropDownCollapseNoError(isEditable, states){
    //console.log('in renderDropDownCollapseNoError')
    return(
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
              {this.mapAndRenderUserAccounts()}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
        {isEditable ? states.challenge : ''}
      </React.Fragment>
    )
  }

  handleDropDownIsLoadingOrRender(isLoading, isError, isEditable, states){
    //console.log('in handleDropDownIsLoadingOrRender', isLoading)
    return(isLoading ? states.isLoading :
      this.handleRenderErrorOrDropDownCollapse(isError, isEditable, states)
    )
  }

  handleNavClasses(isError,isEditable){
    //console.log('handleNavClasses')
    let navClasses = [];
    if (isError) navClasses.push('error');
    if (!isEditable) navClasses.push('logged-out');
    return navClasses;
  }

// componentDidMount(){
// //console.log('header componentDidMount user', this.props.user)
// }

displayActivationBtns(){
  // const {pathname} = this.props.location;
  //     if(pathname.includes("home/@")){
  if(this.props.specificRankingOptionBtns){
        return(
          <PlayerStatusBtn isCurrentUserActive={this.props.isCurrentUserActive} data-cy='playerStatus' data-testid='playerStatus' {...this.props} newrankIdCB={this.props.newrankIdCB} username={this.props.user[1]} rankingJSONdata={this.props.rankingJSONdata} account={this.props.account}/>
      )
    }else{ return null }
}
  //#endregion
  //#region React lifecycle events
  render() {
    if(this.props.userAccounts !== undefined){
          const isEditable = Boolean(this.props.user.username);
          const isError = this.props.error && this.props.error.message;
          console.log('this.props.account', this.props.account)
          console.log('this.props.error', this.props.error)
          //console.log('this.props.error.message', this.props.error.message)
          const isLoading = !Boolean(this.props.account) && !isError;

          //console.log('this.props.account', this.props.account)
          //console.log('this.props.user.username', this.props.user.username)

          let navClasses = this.handleNavClasses(isError,isEditable);

          let states = this.determineStatesForDisplay();

      //This gets rendered to the DOM
          return (
            <Navbar collapseOnSelect className={navClasses.join(' ')}>
              {this.renderNavbarHeader(isLoading, states)}
              {this.renderNavbarCollapse(isLoading, states, isEditable, isError)}
            </Navbar>
          );
      }
      else{
        //return(null)
        return 'There is no account currently defined!'
      }
}

  //#endregion
}
export default withRouter(Header)
