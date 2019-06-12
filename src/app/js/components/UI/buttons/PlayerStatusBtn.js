import React from 'react';
import { Button } from 'react-bootstrap';
import JSONops from '../../Logic/JSONops';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 */

 const PlayerStatusBtn = props => {

   const [playerActive, setPlayerActive] = React.useState(true);
   //do this way to avoid 're-render' error
   let style = '';
   let value = '';

   if(props.isCurrentUserActive === true){
     style = 'success';
     value='De-Activate?';
   }else{
     style = 'warning';
     value='Re-Activate?';
   }

   const [btnText, setValue] = React.useState(value);
   const [bsStyle, setStyle] = React.useState(style);
   //REVIEW: can probably use the main props only
     const _handleChangeStatusPlayerBtnText = (username, props) => {
       if(username !== null){
           if(playerActive === true){
             setPlayerActive(false);
             setStyle('warning');
             setValue('Re-Activate?');
           }else{
             setPlayerActive(true );
             setStyle('success');
             setValue('De-Activate?')
             try {
               console.log('in _handleReactivatePlayer', props.newrankIdCB, props.rankingJSONdata, username, props.account)
               JSONops.reactivatePlayer(props.newrankIdCB, props.rankingJSONdata, username, props.account);
               this.props.history.push('/home/@' + username);
             } catch (err) {
             // stop loading state and show the error
             console.log(err.message);
             };
           }
         }else {
             console.log('no username passed to deactivate btn!')
           }
         }

   return (
       <Button className='deactivatebtn'
       data-cy='deactivate'
       placeholder="De-Activate?"
       data-testid="activatebtn-input"
       bsStyle={style}
       onClick={(e) => _handleChangeStatusPlayerBtnText(props.username)}
       >
         {value}
       </Button>
   );
 };
 export default PlayerStatusBtn
