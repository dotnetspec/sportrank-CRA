import React from 'react'
import PlayerStatusBtn  from '../buttons/PlayerStatusBtn'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';

describe('PlayerStatusBtn', () => {

  it('renders whole PlayerStatusBtn.js correctly', () => {
    const PlayerStatusBtnShallow = shallow(<PlayerStatusBtn />);
   expect(PlayerStatusBtnShallow).toMatchSnapshot();
  });
  
it('renders PlayerStatusBtn.js state correctly', () => {
  const wrapper = mount(<PlayerStatusBtn />);
  expect(wrapper.state('PlayerStatusBtn_clicked')).toEqual(false);
});

//REVIEW: this appears to be just another way of doing same thing
//can probably remove one
  it('deactivate btn renders correctly', () => {
    const deactivateplayerbtn = renderer
     .create(
        <PlayerStatusBtn
          username='player1' />
      ).toJSON();
   expect(deactivateplayerbtn).toMatchSnapshot();
  });

  it('De-Activate - renders PlayerStatusBtn text correctly', () => {
    const PlayerStatusBtnShallow = shallow(<PlayerStatusBtn />);
   expect(PlayerStatusBtnShallow.find('[data-cy="deactivate"]').render().text()).toEqual('De-Activate?')
  });

  it('PlayerStatusBtn btn renders correctly', () => {
    const PlayerStatusBtnrender = renderer
     .create(
        <PlayerStatusBtn username='player1' />
      ).toJSON();
   expect(PlayerStatusBtnrender).toMatchSnapshot();
  });

  it('should check if PlayerStatusBtn_clicked', () => {
    const historyMock = { push: jest.fn() };
    const component = renderer.create(<PlayerStatusBtn
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

 it('should update PlayerStatusBtn state with button click', () => {
   const historyMock = { push: jest.fn() };
   const component = mount(
       <PlayerStatusBtn  username='player1' history={historyMock} />
   );
   component
     .find('PlayerStatusBtn')
     .simulate('click');

     expect(component.state('PlayerActive')).toEqual(false);
     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
     expect(component.state('bsStyle')).toEqual('warning');
     expect(component.state('btnText')).toEqual('Re-Activate?')

     component
       .find('PlayerStatusBtn')
       .simulate('click');

     expect(component.state('PlayerActive')).toEqual(true);
     expect(component.state('PlayerStatusBtn_clicked')).toEqual(true);
     expect(component.state('bsStyle')).toEqual('success');
     expect(component.state('btnText')).toEqual('De-Activate?');
   component.unmount();
 });

 it('Does state update if DeactivatePlayerBtn_clicked', () => {
   const historyMock = { push: jest.fn() };
   const component = renderer.create(<PlayerStatusBtn
     username='player1' history={historyMock}/>)
   expect(component.toJSON()).toMatchSnapshot()
   const instance = component.getInstance()
   expect(instance.state).toMatchSnapshot('initial state')
   instance._handleChangeStatusPlayer({ target: { PlayerStatusBtn_clicked: true } })
   expect(instance.state).toMatchSnapshot('updated state')
 });
});
