import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/**
 * Class representing the area below the header.
 * The component rendering in this area is controlled by
 * a @external "BrowserRouter"
 *
 * @extends React.Component
 */

class DeactivatePlayerBtn extends Component {

  _handleDeactivatePlayer(username) {
    if(username !== null){
      //REVIEW: The naming of 'delete/deactivate' etc.
      // redirect user to the deactive player (currently named 'DeactivatePlayer') page
      this.props.history.push('/delete/@' + username);
    }
    else {
      console.log('no username passed to deactivate btn!')
    }
  }

  render () {
    return (
      <Button bsStyle="primary" data-cy='deactivate' onClick={(e) => this._handleDeactivatePlayer(this.props.username)}>
        Deactivate Player
      </Button>
    )
  }
  //#endregion
}
export default DeactivatePlayerBtn
