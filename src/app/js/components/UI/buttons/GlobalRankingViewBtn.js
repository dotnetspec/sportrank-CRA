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

  export default function GlobalRankingViewBtn(props){

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

  const onClickRankingViewSelected = (row) => {
    //REVIEW: the naming here.
    //tell Header that the view btn has been clicked
    //so it can display the 'Activate?' btn
    props.setspecificRankingOptionBtnsCB();

    props.setnewrankIdCB(row.RANKINGID);

    props.setviewingOnlyCB(true);
    //this.props.onAfterUserUpdate();
    props.history.push('/home/@' + props.username);
    //this.openResultModal();
   }
    //NB: this.props.user or .username etc. causing much confusion
    //needs to be sorted to be consistent
    return (
        <Button
           className='globalrankingviewbtn'
           data-testid={props.rowIndex}
           data-cy='globalrankingviewbtn'
           //type="button"
           onClick={() =>
           onClickRankingViewSelected(props.row)}
        >
        View
        </Button>
    )
  }
  //#endregion
