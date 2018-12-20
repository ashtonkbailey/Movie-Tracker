import { UserForm, mapDispatchToProps } from './UserForm';
import * as actions from '../../actions/index';
import { shallow } from 'enzyme';
import React from 'react';
import { signInUser } from '../../utils/apiCalls'

jest.mock('../../utils/apiCalls')

describe('UserForm', () => {
  describe('mapDispatchToProps', () => {
    it('should return a props object with the method logInUser', () => {
    //setup
      const mockDispatch = jest.fn();
      const mockUser = {name: 'bob', email: 'bob@example.com', password: 'password'}
      const action = actions.logInUser(mockUser)
    //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logInUser(mockUser)
    //expectation
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })
  })

  describe('UserForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<UserForm />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
      name: '',
      email: '',
      password: '',
      loggedIn: false,
      signInError: false,
      logInError: false
      }
      const wrapper = shallow(<UserForm/>)
      expect(wrapper.state()).toEqual(expected)
    })

    it('should change the value of state when handleChange is called', () => {
      const mockEvent = {target: {name: 'userName', value: 'sally'}}
      const wrapper = shallow(<UserForm/>)
      const expected = 'sally'
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().userName).toEqual(expected)
    })

    describe('handleSubmit', () => {
      it('should call handleLogin', async() => {
        const mockEvent = { preventDefault: jest.fn() };
        const wrapper = shallow(<UserForm
          type="login"
        />);
        wrapper.instance().handleLogin = jest.fn();
        await wrapper.instance().handleSubmit(mockEvent, 'login');
        expect(wrapper.instance().handleLogin).toHaveBeenCalled();
      });

      it('should call HandleNewUser', async() => {
        const mockEvent = { preventDefault: jest.fn() };
        const wrapper = shallow(<UserForm
          type="signup"
        />);
        wrapper.instance().handleNewUser = jest.fn();
        await wrapper.instance().handleSubmit(mockEvent, 'signup');
        expect(wrapper.instance().handleNewUser).toHaveBeenCalled();
      });


      it('should run handleSubmit on form submit', () => {
        const wrapper = shallow(<UserForm
          type="login"
        />);
        const e = { preventDefault: jest.fn() }
        wrapper.instance().handleSubmit = jest.fn()

        wrapper.find('form').simulate('submit', e)

        expect(wrapper.instance().handleSubmit).toBeCalledWith(e, 'login')
      })
    })
  })

  describe('handleLogin', () => {
    it('should update state for logged in user', async () => {
      const mockNewUser = {name: 'bob', password: '123', email: 'bob@goodlife.com'}
      signInUser.mockImplementation(()=> {
        return mockNewUser
      })
      const mockLogInUser = jest.fn()
      const wrapper = shallow(<UserForm
        logInUser={mockLogInUser}
        // type="login"
      />);
      const expected = true;
      await wrapper.instance().handleLogin(mockNewUser);
      expect(wrapper.state().loggedIn).toEqual(expected);
})
  })

})