import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import JSONops from '../../JSONops'

/**
 * Class representing the area below the header.
 * The component rendering in this area is controlled by
 * a @external "BrowserRouter"
 *
 * @extends React.Component
 */

class DeactivatePlayerBtn extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);
    // initial state
    this.state = {
      DeactivatePlayerBtn_clicked: false
    };
  }

  _handleDeactivatePlayer(username) {
//console.log('username', username)
    if(username !== null){
      //JSONops.deactivatePlayer(this.props.newrankIdCB, this.props.rankingJSONdata, this.props.user, this.props.account);
      //TODO: find a way to implement this separately - e.g. with setState and in componentDidMount()
      //for now workaround by passing test=true prop
      //if(this.props.test !== 'true'){
        //JSONops.deactivatePlayer(this.props.newrankIdCB, this.props.rankingJSONdata, this.props.user, this.props.account);
        this.setState({DeactivatePlayerBtn_clicked: true });

      //}
      //REVIEW: The naming of 'delete/deactivate' etc.
      // redirect user to the deactive player (currently named 'DeactivatePlayer') page
      this.props.history.push('/delete/@' + username);

    }
    else {
      console.log('no username passed to deactivate btn!')
    }
  }

  // componentDidUpdate() {
  //   if(this.state.DeactivatePlayerBtn_clicked === true){
  //     //console.log('this.props.test', this.props.test)
  //     //if(this.props.test === undefined){
  //      this.props.history.push('/delete/@' + this.props.user);
  //     //}
  //   }
  // }

  render () {
    //NB: this.props.user or .username etc. causing much confusion
    //needs to be sorted to be consistent
    return (
      <Button className='deactivatebtn' bsStyle="primary" data-cy='deactivate' onClick={(e) => this._handleDeactivatePlayer(this.props.user)}>
        Deactivate Player
      </Button>
    )
  }
  //#endregion
}
export default DeactivatePlayerBtn
