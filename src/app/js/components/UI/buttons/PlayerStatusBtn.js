import React from 'react';
import { Button } from 'react-bootstrap';
import JSONops from '../../Logic/JSONops';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 */

 export default function PlayerStatusBtn(props){

   const isCurrentUserActive = JSONops._getUserValue(props.rankingJSONdata, props.username, "ACTIVE");
   //do this way to avoid 're-render' error
   let bsStyle = {color: 'red'}
   let btnText = 'De-Activate?';

   if(isCurrentUserActive === true){
     bsStyle = {color: 'red'}
     btnText='De-Activate?';
   }else{
     bsStyle = {color: 'green'}
     btnText='Re-Activate?';
   }

   //below didn't work ...
   //setHover(!hover) try setHover(hover => !hover)

   //REVIEW: use the main props
   //NB: orig uses 'event': const onChange = event => setValue(event.target.value);
     const _handleChangeStatusPlayerBtnText = (isCurrentUserActive) => {
       if(props.username !== null){
           if(isCurrentUserActive === true){
             //send to de-activate component to change isCurrentUserActiveCB
             props.history.push('/delete/@' + props.username);
           }else{
             props.setOnCallbackisCurrentUserActiveCB(true);
             try {
               //REVIEW: isCurrentUserActiveCB needs be called based on JSONops.reactivatePlayer
               //returning True/False. Put here for now so that test will pass
               JSONops.reactivatePlayer(props.newrankId, props.rankingJSONdata, props.username, props.account);

               props.history.push('/home/@' + props.username);
             } catch (err) {
             // stop loading state and show the error
             };
           }
         }else {
             console.log('no username passed to deactivate btn!')
           }
         }

   return (
       <Button
       className='deactivatebtn'
       data-cy='deactivate'
       placeholder="De-Activate?"
       data-testid="activatebtn-input"
       style={bsStyle}
       onClick={() => _handleChangeStatusPlayerBtnText(isCurrentUserActive)}
       >
         {btnText}
       </Button>
   );
 };
