import React from 'react';
import { Button } from 'react-bootstrap';
//import {newrankId, viewingOnlyCB} from '../../Logic/App'
/**
 * Functional component representing global ranking view button(s) in the BootstrapTable.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"[? tbc]
 *
 * @extends React.Component
 */

  export default function GlobalRankingJoinBtn(props){

    //REVIEW: change name to onClickRankingJoinSelected?
    //onClickRankingJoinSelected(cell, row, rowIndex){
  const onClickRankingJoinSelected = (row) => {
      //console.log('in onClickRankingJoinSelected');

      props.setnewrankIdCB(row.RANKINGID);
      //this.props.setisCurrentUserActiveCB()
      props.setspecificRankingOptionBtnsCB();
      props.setviewingOnlyCB(false);
      //REVIEW: Do we use this? It's for updating account selection:
      props.onAfterUserUpdate();
      //if joining and not yet a member of the ranking home will add the new player to the bottom
      //of the rankings in the selected ladder
      props.history.push('/home/@' + props.username);
      //this.openResultModal();
     }

    return (
       <Button
       className='globalrankingjoinbtn'
       data-testid={props.rowIndex}
       data-cy='globalrankingjoinbtn'
          //type="button"
          onClick={() =>
          onClickRankingJoinSelected(props.row)}
       >
       Join
       </Button>
    )
  }
  //#endregion
