import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import sinon from 'sinon'
import App from '../../App'
import GlobalRankings from '../../GlobalRankings'
//import chai from 'chai'
import DeactivatePlayerBtn  from '../buttons/DeactivatePlayerBtn'
import Header  from '../Header'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

describe('Bootstrap Table UI', () => {
    it.skip('clicking table view btn',()=>{
         //const items = [{'id':1,'text':'hello'},{'id':2,'text':'world'}]
       //   const json = [
       //   {
       //     "RANKINGNAME":"testRa1","RANKINGDESC":"testRank","ACTIVE":true,"RANKINGID":"5c6a7cf5a83a2931773847b8"
       //   }
       // ]
         const handleClickStub = sinon.spy()
         const tableHeaderColumnwrapper = shallow(
           //<BrowserRouter>
             //<BootstrapTable  onChildClick={handleClickStub} rankingListJSONdata={json}/>
             <TableHeaderColumn dataField='viewbtn'
             dataFormat={this.rankingViewButton.bind(this)}
             handlerankingViewButton={this.rankingViewButton.bind(this)} />
           //</BrowserRouter>
         );
         //console.log(appwrapper.state('specificRankingOptionBtns')) // prints false
         //wrapper.find(GlobalRankings).last().simulate('click')
         //const globalRankingswrapper = shallow(<GlobalRankings />);
         const myFakeCallback = () => console.log('Do your treatment here - callback called');
         tableHeaderColumnwrapper.find('bstable').prop('handlerankingViewButton')(myFakeCallback)
         expect(handleClickStub.calledOnce).to.be.true() // successful
         //console.log(appwrapper.state('specificRankingOptionBtns'))  // prints true
          //expect(appwrapper.state().specificRankingOptionBtns).to.equal(false);
       })
});
