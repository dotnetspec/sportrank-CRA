import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
/**
 * Functional component representing player status button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 *
 * @extends React.Component
 */
 //NB: props needed for 'history' props to be available
   const ListAllRankingssBtn = props => {

   // const [playerActive, setPlayerActive] = React.useState(true);
   // const [btnText, setValue] = React.useState('De-Activate?');
   // const [bsStyle, setStyle] = React.useState('success');


   //const onChange = event => setValue(event.target.value);
     // const _handleChangeStatusPlayerBtnText = (username) => {
     // // const _handleChangeStatusPlayerBtnText = event =>
     // // {
     //   if(username !== null){
     //       if(playerActive === true){
     //         setPlayerActive(false);
     //         setStyle('warning');
     //         setValue('Re-Activate?');
     //       }else{
     //         setPlayerActive(true );
     //         setStyle('success');
     //         setValue('De-Activate?')
     //       }
     //     }else {
     //         console.log('no username passed to deactivate btn!')
     //       }
     //     }

           const _handleRankingList = (user) => {
           //try {
             //TODO: refactor?
             //const {pathname} = this.props.location;
             //console.log('pathname in _handleRankingList', pathname)
                 // if(JSONops.isPlayerListedInJSON(this.props.rankingJSONdata, this.props.user.username)
                 //     ){
             //     if(pathname.includes("/sportrank/")){
             // //this.props.history.push('/userrankings/@' + user);
             //       this.props.history.push('/sportrank/');
             //     }else{
             //REVIEW: Better naming for onChildClick
                   //this.props.onListAllChildClick();
                   props.history.push('/');
                 //}
             //this.props.history.push('/@' + this.state.username);
           // } catch (err) {
           // // stop loading state and show the error
           // console.log(err.message);
           // };
         }

   return (
       <Button bsStyle="primary" data-cy='ListAllRankings' onClick={(e) => _handleRankingList()}>
         List All Rankings
       </Button>
   );
 };

 export default withRouter (ListAllRankingssBtn)
