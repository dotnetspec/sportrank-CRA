import React, {
  useState, useEffect
} from 'react';
import {
  Button
} from 'react-bootstrap';
import JSONops from '../../Logic/JSONops'
import {_loadsetJSONData, _sendJSONDataWithRankingID} from '../../SideEffects/io/Jsonio'
/**
 * Functional component representing global ranking join button in the BootstrapTable.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"[? tbc]
 *
 * @extends React.Component
 */

export default function GlobalRankingJoinBtn(props) {

  const onClickRankingJoinSelected = async (row) => {

    props.setnewrankIdCB(row.RANKINGID);
    let tempjson = [];
    const handleCB = (data) =>{
      tempjson = data;
    }
    await _loadsetJSONData(row.RANKINGID, await handleCB);
    //get the data ready with the new user
    //before loading 'Home' page
      const jsonDataBeforeRender = await preprocessDataBeforeRender(tempjson);
      await _sendJSONDataWithRankingID(jsonDataBeforeRender, row.RANKINGID);
      props.setrankingJSONdataCB(jsonDataBeforeRender);
      props.setspecificRankingOptionBtnsCB();
      //props.setviewingOnlyCB(false);
      //if joining and not yet a member of the ranking home will add the new player to the bottom
      //of the rankings in the selected ladder
      props.history.push('/home/@' + props.username);
  }

  const preprocessDataBeforeRender = async (handleCB) => {
    //if there is a username but it's not listed in the json,
    //add this user to the current list
    //REVIEW: This test may be more consistently handled
// console.log('about to preprocessDataBeforeRender')
// console.log('is handleCB defined', handleCB)
// console.log('props.viewingOnlyCB', props.viewingOnlyCB)
// console.log('props.username', props.username)
// console.log('!JSONops.isPlayerListedInJSON', !JSONops.isPlayerListedInJSON(handleCB, props.username))
// const isPlayerListedAlready = JSONops.isPlayerListedInJSON(handleCB, props.username);
// console.log('isPlayerListedAlready',isPlayerListedAlready)
// console.log('!isPlayerListedAlready',!isPlayerListedAlready)
// console.log('props.account', props.account)
    if (props.username !== '' &&
      //!(JSONops.isPlayerListedInJSON(handleCB, props.username))
      JSONops.isSafeToAddPlayerToJSON(handleCB, props.username)
      //&&
      //props.loadingJSON === false &&
      //props.viewingOnlyCB === false
      //props.setviewingOnlyCB(false)
    ) {
      //console.log('createNewUserInJSON in preprocessDataBeforeRender in home.js')
      //console.log('props.rankingID in preprocessDataBeforeRender in home.js', props.newrankId)
      const newUserJsonObj = JSONops.createNewUserInJSON(handleCB, props.username, props.contactno, props.email, props.account, props.description, props.newrankId);
      //_sendJSONDataWithRankingID(newUserJsonObj, props.newrankId);
      //console.log('newUserJsonObj', newUserJsonObj);
      return newUserJsonObj.jsonRS;
      //console.log('player created')
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
    //if (!JSONops.isPlayerListedInJSON(handleCB, props.username)
    if(JSONops.isSafeToAddPlayerToJSON(handleCB, props.username))
      {
      const newUserJsonObj = JSONops.createNewUserInJSON(handleCB, props.username, props.contactno, props.email, props.account, props.description, props.newrankId)
      console.log('newUserJsonObj.jsonRS', newUserJsonObj.jsonRS)
      return newUserJsonObj.jsonRS;
      } else {
        console.log('did nothing')
        return handleCB;
      }
  }

  useEffect(() => {
     //const jsonDataBeforeRender = preprocessDataBeforeRender();
     // console.log('jsonDataBeforeRender', jsonDataBeforeRender);
     // if(JSONops.isDefinedJson(jsonDataBeforeRender)){
     //   //console.log('about to send json to _sendJSONDataWithRankingID', jsonDataBeforeRender, props.newrankId);
     //   _sendJSONDataWithRankingID(jsonDataBeforeRender, props.newrankId);
     //   props.setrankingJSONdataCB(jsonDataBeforeRender);
       //set to viewingOnly and re-render
       //props.setviewingOnlyCB(true);
     //}
    }, [])

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
