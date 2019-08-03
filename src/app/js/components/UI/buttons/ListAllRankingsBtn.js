import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
/**
 * Functional component representing 'home page' listing of all rankings button in the header.
 * The component rendering in this area is controlled by
 * an @external "BrowserRouter"
 *
 * @extends React.Component
 */

 //Return the user to the main listing page
   const ListAllRankingssBtn = props => {
          //REVIEW: is 'user' necessary
           const _handleRankingList = (user) => {
                   props.setResultInfoForDisplayCB('');
                   props.onListAllChildClick();
                   props.history.push('/');
         }
         return (
             <Button
             placeholder="List All Rankings"
             bsStyle="primary"
             data-cy='ListAllRankings'
             data-testid='ListAllRankings'
             onClick={(e) => _handleRankingList()}>
               List All Rankings
             </Button>
         );
 };
 export default withRouter (ListAllRankingssBtn)
