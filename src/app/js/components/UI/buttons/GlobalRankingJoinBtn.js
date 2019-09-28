import React from 'react';
import {
  Button
} from 'react-bootstrap';
import JSONops from '../../Logic/JSONops'
import {
  _loadsetJSONData,
  _sendJSONDataWithRankingID
} from '../../SideEffects/io/Jsonio'
/**
 * Functional component representing global ranking join button in the BootstrapTable.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"[? tbc]
 *
 * @extends React.Component
 */

export default function GlobalRankingJoinBtn(props) {

  const onClickRankingJoinSelected = async (row) => {

    //if the user clicks 'Join' then should always be ACTIVE
    props.setOnCallbackisCurrentUserActiveCB(true)
    //and this needs to be reflected in the json as well as in the UI
    //see below

    props.setnewrankIdCB(row.RANKINGID);
    //only allow this cb to be processed if it's
    //NOT a new user (otherwise overwrites change just made)
    let tempjson = [];
    const handleCB = async (data) => {
      //   if (props.username !== ''){
      tempjson = data;
      console.log('tempjson, props.username', tempjson, props.username)
      const isplayeralreadylisted = JSONops.isPlayerListedInJSON(tempjson, props.username);
      console.log('already listed?', isplayeralreadylisted);
      //props.setrankingJSONdataCB(tempjson);
      //return null;
      if (isplayeralreadylisted) {
        //set user to ACTIVE in the json
        const result = JSONops._setUserValue(tempjson, props.username, "ACTIVE", true);
        props.setrankingJSONdataCB(result);
        //just display as if user had selected 'View'
        props.setspecificRankingOptionBtnsCB(true);
        props.history.push('/home/@' + props.username);
      } else {
        //get the data ready with the new user
        //before loading 'Home' page
        const jsonDataBeforeRender = await preprocessDataBeforeRender(tempjson);
        if (jsonDataBeforeRender !== undefined) {
          await _sendJSONDataWithRankingID(jsonDataBeforeRender, row.RANKINGID);
        }
        props.setrankingJSONdataCB(jsonDataBeforeRender);
        props.setspecificRankingOptionBtnsCB(true);
        //if joining and not yet a member of the ranking home will add the new player to the bottom
        //of the rankings in the selected ladder
        props.history.push('/home/@' + props.username);
      }
    }

    //REVIEW: move to jsonio?
    await _loadsetJSONData(row.RANKINGID, await handleCB);

  }

  const preprocessDataBeforeRender = async (handleCB) => {
    //if there is a username but it's not listed in the json,
    //add this user to the current list
    //REVIEW: This test may be more consistently handled
    if (props.username !== '' &&
      JSONops.isSafeToAddPlayerToJSON(handleCB, props.username)
    ) {
      console.log('account in create new', props.account)
      const newUserJsonObj = JSONops.createNewUserInJSON(handleCB, props.username, props.contactno, props.email, props.account.owner, props.description, props.newrankId);
      return newUserJsonObj.jsonRS;
    }
    if (props.isRankingIDInvalid) {
      console.log('in isRankingIDInvalid')
      props.history.push('/create');
    }
    if (JSONops.isJSONEmpty(handleCB) && props.username === null) {
      console.log('json is empty and there is no username');
      props.history.push('/create');
      return null;
    }
    //if the player isn't listed in the json then add them (only if user clicked 'join')
    if (JSONops.isSafeToAddPlayerToJSON(handleCB, props.username)) {
      const newUserJsonObj = JSONops.createNewUserInJSON(handleCB, props.username, props.contactno, props.email, props.account.owner, props.description, props.newrankId)
      console.log('newUserJsonObj.jsonRS', newUserJsonObj.jsonRS)
      return newUserJsonObj.jsonRS;
    } else {
      console.log('did nothing')
      return handleCB;
    }
  }

  return ( <
    Button className = 'globalrankingjoinbtn'
    data-testid = {
      props.rowIndex
    }
    data-cy = 'globalrankingjoinbtn'
    //type="button"
    onClick = {
      (e) =>
      onClickRankingJoinSelected(props.row)
    } >
    Join <
    /Button>
  )
}
