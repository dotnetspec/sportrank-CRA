//import { Switch, Route } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { Grid, Row, Col, PageHeader, Image, Modal, Navbar, ButtonToolbar, Dropdown, DropdownItem, Overlay, Tooltip, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Grid, Row } from 'react-bootstrap';
import { isEmpty } from '../../utils';
import GlobalRankingViewBtn from '../UI/buttons/GlobalRankingViewBtn';
import GlobalRankingJoinBtn from '../UI/buttons/GlobalRankingJoinBtn';
import React, { Component } from 'react';

// const selectRowPropAfterClickRow = {
//   selectedRankingId: ''
// };

/**
 * Class handling the global ranking selection list
 *
 * User clicks on a ranking to display and use it
 *
 * @extends React.Component
 */

class GlobalRankings extends Component {

  //#region Constructor
  constructor(props){
    super(props);
    this.state = {
      data:''
      // ,
      // //error currently not used, so set to false
      // error: false
    }
    this.tablesortoptions = {
     defaultSortName: 'RANKINGNAME',  // default sort column name
     defaultSortOrder: 'asc'  // default sort order
   };
  }
  //#endregion


   rankingViewButton(cell, row, enumObject, rowIndex) {
       return (
            <GlobalRankingViewBtn
            cell={cell} row={row} rowIndex={rowIndex}
            setspecificRankingOptionBtnsCB={this.props.setspecificRankingOptionBtnsCB}
            onAfterUserUpdate={this.props.onAfterUserUpdate}
            history={this.props.history}
            username={this.props.username}
            setnewrankIdCB={this.props.setnewrankIdCB}
            viewingOnlyCB={this.props.viewingOnlyCB}
            newrankId={this.props.newrankId}
            setviewingOnlyCB={this.props.setviewingOnlyCB}
            />
       )
    }

    rankingJoinButton(cell, row, rowIndex){
      return (
           <GlobalRankingJoinBtn
           cell={cell} row={row} rowIndex={rowIndex}
           setspecificRankingOptionBtnsCB={this.props.setspecificRankingOptionBtnsCB}
           onAfterUserUpdate={this.props.onAfterUserUpdate}
           history={this.props.history}
           username={this.props.username}
           setnewrankIdCB={this.props.setnewrankIdCB}
           newrankId={this.props.newrankId}
           viewingOnlyCB={this.props.viewingOnlyCB}
           setviewingOnlyCB={this.props.setviewingOnlyCB}
           setrankingJSONdataCB={this.props.setrankingJSONdataCB}
           account={this.props.account}
           setOnCallbackisCurrentUserActiveCB={this.props.setOnCallbackisCurrentUserActiveCB}
           />
      )
    }
//#region React lifecycle events
//QUESTION: why does componentDidMount not have the data from this.props.rankingJSONdata
//when it clearly gets passed to Home.js?

  globalBSTableDisplay(){
      //NB: to enable non-test jsonbin.io data use the following as a property of
      //data={this.props.rankingListJSONdata}
      //original test: data={this.state.data}
      return (
          <BootstrapTable  options={ this.tablesortoptions } data={this.props.rankingListJSONdata}
          className='bstable'
          >
                <TableHeaderColumn isKey dataField='RANKINGID'
                hidden >
                  RANKINGID
                </TableHeaderColumn>

                <TableHeaderColumn  dataField='RANKINGNAME'
                filter={ { type: 'TextFilter', defaultValue: '' } }
                >
                  Ranking Name (Filter)
                </TableHeaderColumn>

                <TableHeaderColumn dataField='RANKINGDESC'
                filter={ { type: 'TextFilter',  defaultValue: '' } }
                >
                 Ranking Description (Filter)
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='viewbtn'
                dataFormat={this.rankingViewButton.bind(this)}
                >
                View
                </TableHeaderColumn>
                <TableHeaderColumn
                dataField='joinbtn'
                dataFormat={this.rankingJoinButton.bind(this)}
              >
                Join
                </TableHeaderColumn>

                <TableHeaderColumn dataField='ACTIVE'
                filter={ { type: 'TextFilter', defaultValue: 'true' } }
                hidden>
                  Active?
                </TableHeaderColumn>
              </BootstrapTable>
          )
        }

        componentDidMount() {
          //if there's no user re-direct to create
          if(this.props.user === ''){
            this.props.history.push('/create');
          }
        }



  //REVIEW: Home page may be unnecessarily re-rendering with this approach to passing props
  //but need to pass the username and display it as a greeting and to link account with json data
  //this.props.user[1] is a quick way (not object.keys) to access the array
  //if need it get   {React.version} by adding to return() below: (currently 16.6.3)
  render () {
    return (
      <div>
      {isEmpty(this.props.error) ? null : <span className='error'>Please note: there was an ERROR!</span>}
      <Grid>
        <Row>
          {this.globalBSTableDisplay()}
        </Row>
      </Grid>
      </div>
    )
  }
  //#endregion
}

export default GlobalRankings
