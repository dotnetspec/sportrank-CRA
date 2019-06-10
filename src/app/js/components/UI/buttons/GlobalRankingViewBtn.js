import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import {newrankIdCB, viewingOnlyCB} from '../../Logic/App'
/**
 * Class representing global ranking view button in the BootstrapTable.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"[? tbc]
 *
 * @extends React.Component
 */
class GlobalRankingViewBtn extends Component {

  //#region Constructor
  constructor(props, context) {
    super(props, context);
    // initial state
    this.state = {
      //GlobalRankingViewBtn_clicked: false
    };
  }

  // const selectRowPropAfterClickRow = {
  //   selectedRankingId: ''
  // };

  // _handleChangeStatusPlayer(username) {
  //   if(username !== null){
  //     this.setState({GlobalRankingViewBtn_clicked: true });
  //     if(this.state.PlayerActive === true){
  //       this.setState({PlayerActive: false });
  //     }else{
  //       this.setState({PlayerActive: true });
  //     }
  //     //REVIEW: passing name to json to be deactivated
  //     //could be done in this component?
  //     this.props.history.push('/delete/@' + username);
  //   }
  //   else {
  //     console.log('no username passed to deactivate btn!')
  //   }
  // }

  onClickRankingViewSelected(row){
    //REVIEW: the naming here.
    //tell Header that the view btn has been clicked
    //so it can display the 'Activate?' btn
    this.props.onChildClick();
    console.log('typeof row', typeof row)
    console.log('row.RANKINGID', row.RANKINGID)
    //NB: this was using 'template literals' backquote or backtick character
    //to find the RANKINGID in the row object
    //I think this means it therefore (together with
    //the ${}) sees it as a legitimate js object
    //original:
    //var rankingID = `${row['RANKINGID']}`
    this.props.newrankIdCB(row.RANKINGID);
    this.props.viewingOnlyCB(true);
    this.props.onAfterUserUpdate();
    this.props.history.push('/home/@' + this.props.username);
    //this.openResultModal();
   }

  render () {
    //NB: this.props.user or .username etc. causing much confusion
    //needs to be sorted to be consistent
    return (
      // <Button className='globalrankingviewbtn'  data-cy='globalrankingviewbtn'
      // //bsStyle={this.state.bsStyle}
      // onClick={(e) => this._handleChangeStatusPlayer(this.props.user)}
      // >
      //   {this.state.btnText}
      // </Button>

        <Button
           className='globalrankingviewbtn'  data-cy='globalrankingviewbtn'
           //type="button"
           onClick={() =>
           //this.onClickRankingViewSelected(this.props.cell, this.props.row, this.props.rowIndex)}
           this.onClickRankingViewSelected(this.props.row)}
           //onClick={(e) => this._handleChangeStatusPlayer(this.props.user)}
        >
        View

        </Button>

    )
  }
  //#endregion
}
export default GlobalRankingViewBtn
