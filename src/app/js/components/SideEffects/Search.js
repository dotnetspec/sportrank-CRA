import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

/**
 * Class that renders a form to faciliate searching of
 * for a username and to redirect to that user's challenges
 * page.
 *
 * @extends React.Component
 */
class Search extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);

    // initial state
    this.state = {
      username: '',
      usernameHasChanged: false
    };

    //this._handleClick = this._handleClick.bind(this);
  }
  //#endregion

  //#region Component events
  /**
   * Handles the 'Search' button click event which
   * sends the browser to the route to see the specified
   * user's challenges.
   *
   * @returns {null}
   */
  _handleClick(e) {
    // if the form is in error, or the user has not typed in a username, do nothing
    if (this._getValidationState() === 'error' || !this.state.usernameHasChanged) {
      return e.preventDefault();
    }

    // redirec the user to the searched for user's challenges page
    //ie. to the Userchallenges.js component
    this.props.history.push('/@' + this.state.username);
  }

  /**
   * When user changes an input value, record that in the state.
   *
   * @param {SyntheticEvent} cross-browser wrapper around the browser’s native event
   *
   * @return {null}
   */
  _handleChange(e) {
    let state = { usernameHasChanged: true };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  //#endregion

  //#region Helper methods
  /**
   * Validates the form. Return null for no state change,
   * 'success' if valid.
   *
   * @return {string} null for no state change, 'success'
   * if valid.
   */
  _getValidationState() {

    // ensure that the username has been changed and that a user has typed something in
    return (this.state.username === '' && !this.state.usernameHasChanged) || this.state.username.length > 0 ? null : 'error';
  }
  //#endregion

  //#region React lifecycle events
  render() {
    let validationState = this._getValidationState();
    let isValid = validationState !== 'error';

    return (
      <>
      <FormGroup validationState={validationState}>
        <InputGroup>
          <FormControl
            style={{width: "140px"}}
            type="text"
            value={this.state.username}
            placeholder="Enter opponent name to list your challenges"
            name="username"
            onChange={ (e) => this._handleChange(e) }
            onKeyPress={ (e) => e.key === 'Enter' ? this._handleClick(e) : false }
          />
          <InputGroup.Button>
          <Button
            bsStyle="primary"
            disabled={ !isValid }
            onClick={ !isValid ? null : (e) => this._handleClick(e) }></Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
      </>
    );
  }
  //#endregion
}

export default withRouter(Search);
