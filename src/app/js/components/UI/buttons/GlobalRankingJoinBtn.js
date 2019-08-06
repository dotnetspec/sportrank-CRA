import React from 'react';
import {
  Button
} from 'react-bootstrap';
/**
 * Functional component representing global ranking join button in the BootstrapTable.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"[? tbc]
 *
 * @extends React.Component
 */

export default function GlobalRankingJoinBtn(props) {

  const onClickRankingJoinSelected = (row) => {
    props.setnewrankIdCB(row.RANKINGID);
    props.setspecificRankingOptionBtnsCB();
    props.setviewingOnlyCB(false);
    //if joining and not yet a member of the ranking home will add the new player to the bottom
    //of the rankings in the selected ladder
    props.history.push('/home/@' + props.username);
  }

  return ( <
    Button className = 'globalrankingjoinbtn'
    data-testid = {
      props.rowIndex
    }
    data-cy = 'globalrankingjoinbtn'
    //type="button"
    onClick = {
      () =>
      onClickRankingJoinSelected(props.row)
    } >
    Join <
    /Button>
  )
}
