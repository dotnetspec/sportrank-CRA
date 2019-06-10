import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App  from '../App'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup);

describe('App', () => {

  it('renders whole App.js correctly', () => {
    const AppShallow = shallow(<App />);
   expect(AppShallow).toMatchSnapshot();
  });

  it('shallow <BrowserRouter><App /></BrowserRouter> correctly', () => {
    const AppShallow = shallow(<BrowserRouter><App /></BrowserRouter>);
   expect(AppShallow).toMatchSnapshot();
  });

  it('mount <BrowserRouter><App /></BrowserRouter> correctly', () => {
    const AppMount = mount(<BrowserRouter><App /></BrowserRouter>);
   expect(AppMount).toMatchSnapshot();
  });

it.skip('renders App.js state correctly', () => {
  const wrapper = mount(<BrowserRouter><App /></BrowserRouter>);
  //console.log(wrapper.instance().state);
  //const wrapper = shallow(<App />);
  //const wrapper = mount(<App />);
  console.log(wrapper.instance().state);
  //const wrapper = mount(shallow(<BrowserRouter><App /></BrowserRouter>).get(0));
  // expect(wrapper.state('foo')).to.equal(10);
  expect(wrapper.state('.specificRankingOptionBtns')).toEqual(false);
  //expect(wrapper.state().foo).to.equal(10);
  //expect(wrapper.state().PlayerStatusBtn_clicked).to.equal(false);
});

describe('RTL - <App/> ', () => {
    fit('check btn visibility', () => {
      // Render new instance in every test to prevent leaking state
      // const historyMock = { push: jest.fn() };
      // const onClick = jest.fn();
      // const onAfterUserUpdate = jest.fn();
      // const newrankIdCB = jest.fn();
      // const viewingOnlyCB = jest.fn();
      //
      // const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

      const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);

      //looking for text that hasn't been rendered just causes error
        //expect(getByText("De-Activate")).not.toBeVisible();
        expect(getByText("List All Rankings")).toBeVisible();

      // fireEvent.click(getByText(/View/i));
      // expect(onClick).toHaveBeenCalled();
      // expect(onAfterUserUpdate).toHaveBeenCalled();
      // expect(newrankIdCB).toHaveBeenCalled();
      // expect(viewingOnlyCB).toHaveBeenCalled();
    });
});

//REVIEW; to do: code lifted from:
//https://stackoverflow.com/questions/41864111/how-to-test-component-callback-invoked-by-child-component-callback-in-react-with
describe('<App/> handling the PlayerStatusBtn_clicked callback', () => {
  it.skip('should handle a child PlayerStatusBtn_clicked', () => {
    const onParentClick = stub();
    const wrapper = shallow(<App onChildClick={onParentClick} />);
    wrapper.find("Child").prop('onChildClick')('foo');
    expect(onParentClick.callCount).to.be.equal(1);
    // You can also check if the 'foo' argument was passed to onParentClick
  });

  it('should handle a child PlayerStatusBtn_clicked', () => {
    const wrapper = mount(<BrowserRouter><App /></BrowserRouter>);
    expect(wrapper.find('.specificRankingOptionBtns')).toEqual(false);
    //expect(wrapper.find('.bar')).to.have.lengthOf(0);
    wrapper.setState({ specificRankingOptionBtns: true });
    expect(wrapper.find('.specificRankingOptionBtns')).toEqual(true);
    //expect(wrapper.find('.bar')).to.have.lengthOf(1);
  });
});

//REVIEW: this appears to be just another way of doing same thing
//can probably remove one
  it('deactivate btn renders correctly', () => {
    const deactivateplayerbtn = renderer
     .create(
        <App
          username='player1' />
      ).toJSON();
   expect(deactivateplayerbtn).toMatchSnapshot();
  });

  it('De-Activate - renders App text correctly', () => {
    const AppShallow = shallow(<App />);
   expect(AppShallow.find('[data-cy="deactivate"]').render().text()).toEqual('De-Activate?')
  });

  it('App btn renders correctly', () => {
    const Apprender = renderer
     .create(
        <App username='player1' />
      ).toJSON();
   expect(Apprender).toMatchSnapshot();
  });

  it('should check if App_clicked', () => {
    const historyMock = { push: jest.fn() };
    const component = renderer.create(<App
      username='player1' history={historyMock}/>)
    expect(component.toJSON()).toMatchSnapshot()
    // getInstance is returning the `this` object you have in your component
    // meaning anything accessible on `this` inside your component
    // can be accessed on getInstance, including props!
    const instance = component.getInstance()
    expect(instance.state).toMatchSnapshot('initial state')
    instance._handleChangeStatusPlayer({ target: { PlayerStatusBtn_clicked: true } })
    expect(instance.state).toMatchSnapshot('updated state')
  });

 it('should update App state with button click', () => {
   const historyMock = { push: jest.fn() };
   const component = mount(
       <App  username='player1' history={historyMock} />
   );
   component
     .find('PlayerStatusBtn')
     .simulate('click');

     expect(component.state('PlayerActive')).toEqual(false);
     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
     expect(component.state('bsStyle')).toEqual('warning');
     //expect(component.state('btnText').text()).toEqual('Re-Activate?');
     expect(component.state('btnText')).toEqual('Re-Activate?')

     component
       .find('PlayerStatusBtn')
       .simulate('click');

     expect(component.state('PlayerActive')).toEqual(true);
     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
     expect(component.state('bsStyle')).toEqual('success');
     //expect(component.state('btnText').render().text()).toEqual('De-Activate?')
     expect(component.state('btnText')).toEqual('De-Activate?');

   component.unmount();
 });

 // it('De-Activate - renders PlayerStatusBtn text correctly', () => {
 //   const historyMock = { push: jest.fn() };
 //   const component = mount(
 //       <PlayerStatusBtn  username='player1' history={historyMock} />
 //   );
 //   expect(shallow(<PlayerStatusBtn />).find('form.login').exists()).toBe(true);
 // });

 it('Does state update if DeactivatePlayerBtn_clicked', () => {
   const historyMock = { push: jest.fn() };
   const component = renderer.create(<App
     username='player1' history={historyMock}/>)
   expect(component.toJSON()).toMatchSnapshot()

   // getInstance is returning the `this` object you have in your component
   // meaning anything accessible on `this` inside your component
   // can be accessed on getInstance, including props!
   const instance = component.getInstance()
   expect(instance.state).toMatchSnapshot('initial state')

   instance._handleChangeStatusPlayer({ target: { PlayerStatusBtn_clicked: true } })
   expect(instance.state).toMatchSnapshot('updated state')
 });

//simulating changes (e.g. to form input)
//  .find('#name')
// .simulate('change', { target: { value: 'Ross' } });
});
