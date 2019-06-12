import React from 'react';
import { Button } from 'react-bootstrap';
import JSONops from '../../Logic/JSONops';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 *
 * @extends React.Component
 */
 const PlayerStatusBtn = (username) => {

   const [playerActive, setPlayerActive] = React.useState(true);
   const [btnText, setValue] = React.useState('De-Activate?');
   const [bsStyle, setStyle] = React.useState('success');


   //const onChange = event => setValue(event.target.value);
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
               console.log('in _handleReactivatePlayer', props.newrankIdCB, this.props.rankingJSONdata, username, this.props.account)
               JSONops.reactivatePlayer(this.props.newrankIdCB, this.props.rankingJSONdata, username, this.props.account);
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
       <Button className='deactivatebtn'  data-cy='deactivate'
       placeholder="De-Activate?"
       data-testid="activatebtn-input"
       bsStyle={bsStyle}
       onClick={(e) => _handleChangeStatusPlayerBtnText(username)}
       >
         {btnText}
       </Button>
   );
 };


 export default PlayerStatusBtn
