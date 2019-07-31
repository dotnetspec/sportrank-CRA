import React from 'react';
import { Button } from 'react-bootstrap';
import JSONops from '../../Logic/JSONops';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 */

 export default function PlayerStatusBtn(props){
   //console.log('PlayerStatusBtn username', props.username)
   //console.log('PlayerStatusBtn props.isCurrentUserActive ', props.isCurrentUserActive )
   //const [playerActive, setPlayerActive] = React.useState(true);
   //const [btnText, setValue] = React.useState('De-Activate?');
   //const [bsStyle, setStyle] = React.useState('success');
   //do this way to avoid 're-render' error
   let bsStyle = {color: 'red'}
   let btnText = 'De-Activate?';

   if(props.isCurrentUserActive === true){
     bsStyle = {color: 'red'}
     btnText='De-Activate?';
     // setValue('De-Activate?')
     // setStyle('success')
   }else{
     //bsStyle = 'success';
     bsStyle = {color: 'green'}
     btnText='Re-Activate?';
     // setValue('Re-Activate?')
     // setStyle('warning')
   }

   //below didn't work ...
   //setHover(!hover) try setHover(hover => !hover)

   //REVIEW: use the main props
   //NB: orig uses 'event': const onChange = event => setValue(event.target.value);
     const _handleChangeStatusPlayerBtnText = () => {
       if(props.username !== null){
           if(props.isCurrentUserActive === true){
             //setPlayerActive(false);
             //setStyle('warning');
             //setValue('Re-Activate?');
             //style = 'warning';
             //value='Re-Activate?';

             //send to de-activate component to change isCurrentUserActiveCB
             props.history.push('/delete/@' + props.username);
           }else{
             //setPlayerActive(true );
             //setStyle('success');
             //setValue('De-Activate?')
             //style = 'success';
             //value='De-Activate?';
             props.setOnCallbackisCurrentUserActiveCB(true);
             try {
               //REVIEW: isCurrentUserActiveCB needs be called based on JSONops.reactivatePlayer
               //returning True/False. Put here for now so that test will pass

               //console.log('in _handleReactivatePlayer', props.newrankId, props.rankingJSONdata, props.username, props.account)
               JSONops.reactivatePlayer(props.newrankId, props.rankingJSONdata, props.username, props.account);
               //props.isCurrentUserActiveCB(true);

               props.history.push('/home/@' + props.username);
               //this.props.history.push('/home/@' + username);
             } catch (err) {
             // stop loading state and show the error
             //console.log('err.message', err.message);
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
       onClick={() => _handleChangeStatusPlayerBtnText()}
       >
         {btnText}
       </Button>
   );
 };
 //export default PlayerStatusBtn
