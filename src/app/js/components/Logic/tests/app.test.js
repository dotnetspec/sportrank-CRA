import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App  from '../App'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import { render, fireEvent, cleanup,
   waitForElement, } from '@testing-library/react'
import {renderWithRouter} from '../../../utils'
import 'jest-dom/extend-expect'
import axiosMock  from 'axios'
//import { MemoryRouter as Router } from 'react-router-dom';
// import {
//   // Tip: all queries are also exposed on an object
//   // called "queries" which you could import here as well
//   wait,
// } from '@testing-library/dom'

afterEach(cleanup);

jest.mock('axios');

//ensure describe blocks don't overlap
describe('RTL - <App/> ', () => {
  xit('loads and displays greeting', async () => {
    const url = '/'
    const { getByText, getByTestId } = renderWithRouter(<App url={url} />)
    const globalRankingData = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

    axiosMock.get.mockResolvedValueOnce({
      data: { rankingListData: globalRankingData },
    })

    //fireEvent.click(getByText('Load Greeting'))

    // const greetingTextNode = await waitForElement(() =>
    //   getByTestId('greeting-text')
    // )

    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(url)
    expect(getByTestId('globalrankingviewbtn')).toHaveTextContent('View')
    //expect(getByTestId('globalrankingviewbtn')).toHaveAttribute('disabled')
  })

//this test causes error: Cannot log after tests are done. Did you forget to wait for something async in your test?
//Attempted to log "Warning: Can't perform a React state update on an unmounted component
// xit('RTL - check elements rendered to DOM when render(<App />) (many e.g. most btns are not!)', () => {
//   const { getByText } = renderWithRouter(<App />);
//   expect (getByText('Sportrank HOME')).toBeInTheDocument();
//   });

//TODO: Need to figure out visibility in child components before coming back to
//how this works at the App level
xit('RTL - check btn visibility', () => {
      // Render new instance in every test to prevent leaking state
      // const historyMock = { push: jest.fn() };
      // const onClick = jest.fn();
      // const onAfterUserUpdate = jest.fn();
      // const newrankIdCB = jest.fn();
      // const viewingOnlyCB = jest.fn();
      //
      // const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

      //const { getByText, container, queryByTestId } = renderWithRouter(<App />);
      const { queryByTestId, getByTestId, getElementById, rootNode, getByText } = renderWithRouter(<App />);
      //const ancestor = queryByTestId('app')



      //const {queryByTestId} = render(/* Rendered HTML */)
//const ancestor = document.querySelector('[data-testid="app"]')
//const ancestor = queryByTestId(container, 'app')
//const descendant = queryByTestId('header')
//const nonExistantElement = queryByTestId('globalrankingviewbtn')

//expect(document.querySelector('[data-testid="app"]')).toBeInTheDocument()
//expect(document).toContainQuerySelector('[data-testid="app"]')

//expect(getElementById('app')).toBeInTheDocument()
//const root = rootNode.querySelector('.app')
//REVIEW: can be improved but ensures exists ...
expect (getByText(/Update Profile/i)).toHaveTextContent('Update Profile');

//expect(getByTestId('app')).toBeInTheDocument()

// expect(ancestor).toContainElement(descendant)
// expect(descendant).not.toContainElement(ancestor)
// expect(ancestor).not.toContainElement(nonExistantElement)

      //looking for text that hasn't been rendered just causes error
        //expect(getByText("De-Activate")).not.toBeVisible();
        //expect(getByText("De-Activate")).not.toBeVisible();
        //expect(getByText(container, 'De-Activate')).not.toBeVisible()
        //expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeVisible()

      // fireEvent.click(getByText(/View/i));
      // expect(onClick).toHaveBeenCalled();
      // expect(onAfterUserUpdate).toHaveBeenCalled();
      // expect(newrankIdCB).toHaveBeenCalled();
      // expect(viewingOnlyCB).toHaveBeenCalled();
    });



    xit("RTL - List All Ranking btn should be visisble", () => {
      // jest.mock('react-router', () => ({
      //   withRouter: Comp => props => <Comp {...props} />,
      // }))
        const { getByTestId, container, getByValue } = renderWithRouter(<App />);
        //expect(container.innerHTML).toMatch('List All Rankings')
          expect(getByValue(container, 'List All Rankings').toHaveTextContent('List All Rankings'))
          //console.log(container.classList, container.id, container.innerHTML);
          //expect(getByTestId('ListAllRankings')).toHaveAttribute('enabled')
        //const container = render(<BrowserRouter><App /></BrowserRouter>)
        //looking for text that hasn't been rendered just causes error
          //expect(getByText("De-Activate")).not.toBeVisible();
          //expect(getByText("List All Rankings")).toBeVisible();
          //expect(document.querySelector('.ListAllRankings').innerHTML).toBe("List All Rankings")
          //expect(getByTestId('ListAllRankings')).toHaveTextContent('List All Rankings')
          //expect(getByText('List All Rankings')).toBeInTheDocument()
      });
});

describe('Enzyme tests: App', () => {

  it('renders whole App.js correctly', () => {
    const AppShallow = shallow(<App />);
   expect(AppShallow).toMatchSnapshot();
  });

  it('shallow <BrowserRouter><App /></BrowserRouter> correctly', () => {
    const AppShallow = shallow(<BrowserRouter><App /></BrowserRouter>);
   expect(AppShallow).toMatchSnapshot();
  });

//https://stackoverflow.com/questions/56285755/how-to-fix-typeerror-reactwrapperstatestate-requires-that-state-not
// fit('renders App.js state correctly', () => {
//
//       const mountWithRouter = node => mount(<BrowserRouter>{node}</BrowserRouter>);
//       const wrapper = mountWithRouter(<App />);
//       const componentInstance = wrapper
//         .childAt(0)
//         .childAt(0) // could also be .find(Foo)
//         .instance();
//
//         console.log('wrapper.instance()', wrapper.instance())
//     //console.log(componentInstance.instance());
//     const mountedState = componentInstance.state.specificRankingOptionBtns;
//     console.log('mountedState', mountedState);
//     expect(mountedState).toEqual(false);
//
//
//   //expect(wrapper.state('.specificRankingOptionBtns')).toEqual(false);
//   //expect(wrapper.state().foo).to.equal(10);
//   //expect(wrapper.state().PlayerStatusBtn_clicked).to.equal(false);
// });



//REVIEW; to do: code lifted from:
//https://stackoverflow.com/questions/41864111/how-to-test-component-callback-invoked-by-child-component-callback-in-react-with
//describe('<App/> handling the PlayerStatusBtn_clicked callback', () => {
  // it.skip('should handle a child PlayerStatusBtn_clicked', () => {
  //   const onParentClick = stub();
  //   const wrapper = shallow(<App onChildClick={onParentClick} />);
  //   wrapper.find("Child").prop('onChildClick')('foo');
  //   expect(onParentClick.callCount).to.be.equal(1);
  //   // You can also check if the 'foo' argument was passed to onParentClick
  // });

//   it('should handle a child PlayerStatusBtn_clicked', () => {
//     const wrapper = mount(<BrowserRouter><App /></BrowserRouter>);
//     expect(wrapper.find('.specificRankingOptionBtns')).toEqual(false);
//     //expect(wrapper.find('.bar')).to.have.lengthOf(0);
//     wrapper.setState({ specificRankingOptionBtns: true });
//     expect(wrapper.find('.specificRankingOptionBtns')).toEqual(true);
//     //expect(wrapper.find('.bar')).to.have.lengthOf(1);
//   });
// });



//REVIEW: this appears to be just another way of doing same thing
//can probably remove one

//these tests will probably be replaced by RTL ones (or removed)
//implementation oriented?

  // it('App btn renders correctly', () => {
  //   const Apprender = renderer
  //    .create(
  //       <App username='player1' />
  //     ).toJSON();
  //  expect(Apprender).toMatchSnapshot();
  // });

  // it('1 should check if App_clicked', () => {
  //   const historyMock = { push: jest.fn() };
  //   const component = renderer.create(<App
  //     username='player1' history={historyMock}/>)
  //   expect(component.toJSON()).toMatchSnapshot()
  //   // getInstance is returning the `this` object you have in your component
  //   // meaning anything accessible on `this` inside your component
  //   // can be accessed on getInstance, including props!
  //   const instance = component.getInstance()
  //   expect(instance.state).toMatchSnapshot('initial state')
  //   instance._handleChangeStatusPlayer({ target: { PlayerStatusBtn_clicked: true } })
  //   expect(instance.state).toMatchSnapshot('updated state')
  // });

 // xit('should update App state with button click', () => {
 //   const historyMock = { push: jest.fn() };
 //   const component = mount(
 //       <App  username='player1' history={historyMock} />
 //   );
 //   component
 //     .find('PlayerStatusBtn')
 //     .simulate('click');
 //
 //     expect(component.state('PlayerActive')).toEqual(false);
 //     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
 //     expect(component.state('bsStyle')).toEqual('warning');
 //     //expect(component.state('btnText').text()).toEqual('Re-Activate?');
 //     expect(component.state('btnText')).toEqual('Re-Activate?')
 //
 //     component
 //       .find('PlayerStatusBtn')
 //       .simulate('click');
 //
 //     expect(component.state('PlayerActive')).toEqual(true);
 //     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
 //     expect(component.state('bsStyle')).toEqual('success');
 //     //expect(component.state('btnText').render().text()).toEqual('De-Activate?')
 //     expect(component.state('btnText')).toEqual('De-Activate?');
 //
 //   component.unmount();
 // });

 // it('De-Activate - renders PlayerStatusBtn text correctly', () => {
 //   const historyMock = { push: jest.fn() };
 //   const component = mount(
 //       <PlayerStatusBtn  username='player1' history={historyMock} />
 //   );
 //   expect(shallow(<PlayerStatusBtn />).find('form.login').exists()).toBe(true);
 // });

 // xit('Does state update if De/activatePlayerBtn_clicked', () => {
 //   const historyMock = { push: jest.fn() };
 //   const component = renderer.create(<App
 //     username='player1' history={historyMock}/>)
 //   expect(component.toJSON()).toMatchSnapshot()
 //
 //   // getInstance is returning the `this` object you have in your component
 //   // meaning anything accessible on `this` inside your component
 //   // can be accessed on getInstance, including props!
 //   const instance = component.getInstance()
 //   expect(instance.state).toMatchSnapshot('initial state')
 //
 //   instance._handleChangeStatusPlayer({ target: { PlayerStatusBtn_clicked: true } })
 //   expect(instance.state).toMatchSnapshot('updated state')
 // });

//simulating changes (e.g. to form input)
//  .find('#name')
// .simulate('change', { target: { value: 'Ross' } });
});
