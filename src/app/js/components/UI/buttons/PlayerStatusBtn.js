import React from 'react';
import { Button } from 'react-bootstrap';
import JSONops from '../../Logic/JSONops';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 */

 const PlayerStatusBtn = props => {
   console.log('props.isCurrentUserActive', props.isCurrentUserActive)
   const [playerActive, setPlayerActive] = React.useState(props.isCurrentUserActive);
   //do this way to avoid 're-render' error
   let style = '';
   let value = '';

   if(playerActive === true){
     style = 'success';
     value='De-Activate?';
   }else{
     style = 'warning';
     value='Re-Activate?';
   }

   const [btnText, setValue] = React.useState(value);
   const [bsStyle, setStyle] = React.useState(style);

   //displayCurrentStatus();


   //const onChange = event => setValue(event.target.value);
   //REVIEW: can probably use the main props only
     const _handleChangeStatusPlayerBtnText = (username, props) => {
     // const _handleChangeStatusPlayerBtnText = event =>
     // {
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

       //   const displayCurrentStatus = props => {
       //     if(props.isCurrentUserActive !== true){
       //       setPlayerActive(false);
       //       setStyle('warning');
       //       setValue('Re-Activate?');
       //     }else{
       //       setPlayerActive(true );
       //       setStyle('success');
       //       setValue('De-Activate?')
       //   }
       // }


   return (
       <Button className='deactivatebtn'  data-cy='deactivate'
       placeholder="De-Activate?"
       data-testid="activatebtn-input"
       bsStyle={bsStyle}
       onClick={(e) => _handleChangeStatusPlayerBtnText(props.username)}
       >
         {btnText}
       </Button>
   );
 };


 export default PlayerStatusBtn
