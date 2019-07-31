import React from 'react';

/**
 * Class displaying the accumulated ETH balance from
 *previous transactions
 *
 * @extends React.Component
 */
//CurrentETHBal works with callbacks in the parent (Header)
//to update the external account balance
//http://johnnyji.me/react/2015/06/26/why-setting-props-as-state-in-react-is-blasphemy.html
//REVIEW: Re-factor to function component?

  class CurrentETHBal extends React.Component {

    combineETHVals(){
      const origETHInt = parseInt(this.props.updatedExtAcctBalCB);
      return origETHInt;
    }
    render() {
      console.log('extbal', this.props.updatedExtAcctBalCB);
      let htmlTxtToReturn = ''
      let htmlTxtToReturn2 = ''
      if(this.props.updatedExtAcctBalCB !== 0){
       htmlTxtToReturn = 'SportRank has contributed: '
       htmlTxtToReturn2 = this.combineETHVals() + " ETH to your favourite sport"
      }
      return(
        <div>
          <small>
            { htmlTxtToReturn }
            <br></br>
            { htmlTxtToReturn2 }
          </small>
        </div>
      );
    }
  }
  export default CurrentETHBal
