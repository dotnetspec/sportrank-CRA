import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
/**
 * Class representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 *
 * @extends React.Component
 */
class PlayerStatusBtn extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);
    // initial state
    this.state = {
      PlayerActive: true,
      PlayerStatusBtn_clicked: false,
      bsStyle: 'success',
      btnText: 'De-Activate?'
    };
  }

  _handleChangeStatusPlayer(username) {
    if(username !== null){
      this.setState({PlayerStatusBtn_clicked: true });
      if(this.state.PlayerActive === true){
        this.setState({PlayerActive: false });
        this.setState({bsStyle: 'warning'});
        this.setState({btnText: 'Re-Activate?'})
      }else{
        this.setState({PlayerActive: true });
        this.setState({bsStyle: 'success'});
        this.setState({btnText: 'De-Activate?'})
      }
      //REVIEW: passing name to json to be deactivated
      //could be done in this component?
      this.props.history.push('/delete/@' + username);
    }
    else {
      console.log('no username passed to deactivate btn!')
    }
  }

  render () {
    //NB: this.props.user or .username etc. causing much confusion
    //needs to be sorted to be consistent
    return (
      <Button className='deactivatebtn'  data-cy='deactivate'
      bsStyle={this.state.bsStyle}
      onClick={(e) => this._handleChangeStatusPlayer(this.props.user)}
      >
        {this.state.btnText}
      </Button>
    )
  }
  //#endregion
}
export default PlayerStatusBtn
