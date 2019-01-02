import { UserForm, mapDispatchToProps } from './UserForm';
import * as actions from '../../actions/index';
import { shallow } from 'enzyme';
import React from 'react';
import { signInUserThunk } from '../../thunks/signInUser'
import { addNewUserThunk } from '../../thunks/addNewUser'
import { getFavoritesThunk } from '../../thunks/getFavorites'

jest.mock('../../thunks/signInUser')
jest.mock('../../thunks/addNewUser')
jest.mock('../../thunks/getFavorites')

describe('UserForm', () => {
  describe('mapDispatchToProps', () => {
    it('should return a props object with the method addNewUser', () => {
      const mockDispatch = jest.fn();
      const mockUser = {name: 'bob', email: 'bob@example.com', password: 'password'}
      const action = addNewUserThunk(mockUser)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addNewUser(mockUser)
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('should return a props object with the method signInUser', () => {
      const mockDispatch = jest.fn();
      const mockUser = {name: 'bob', email: 'bob@example.com', password: 'password'}
      const action = signInUserThunk(mockUser)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.signInUser(mockUser)
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('should return a props object with the method getFavoritesThunk', () => {
      const mockDispatch = jest.fn();
      const action = getFavoritesThunk(1)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getFavoritesThunk(1)
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })
  })

  describe('UserForm Component', () => {
    it('should match the snapshot', () => {
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn()
      const mockUser = {name: 'Sam'}
      const mockGetFavoritesThunk = jest.fn()

      const wrapper = shallow(<UserForm  user={mockUser} getFavoritesThunk={mockGetFavoritesThunk} addNewUser={mockAddNewUser} signInUser={mockSignInUser}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const expected = {
      name: '',
      email: '',
      password: '',
      loggedIn: false,
      signInError: false,
      logInError: false
      }
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn()
      const wrapper = shallow(<UserForm  user={mockUser} addNewUser={mockAddNewUser} signInUser={mockSignInUser} getFavoritesThunk={mockGetFavoritesThunk} />)
      expect(wrapper.state()).toEqual(expected)
    })

    it('should change the value of state when handleChange is called', () => {
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn()
      const mockEvent = {target: {name: 'userName', value: 'sally'}}
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const wrapper = shallow(<UserForm  addNewUser={mockAddNewUser}signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk} />)
      const expected = 'sally'
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().userName).toEqual(expected)
    })

    describe('handleSubmit', () => {
      it('should call handleLogin', async() => {
        const mockAddNewUser = jest.fn()
        const mockSignInUser = jest.fn()
        const mockUser = {}
        const mockGetFavoritesThunk = jest.fn()
        const mockEvent = { preventDefault: jest.fn() };
        const wrapper = shallow(<UserForm addNewUser={mockAddNewUser}signInUser={mockSignInUser}
          type="login"  user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
        />);
        wrapper.instance().handleLogin = jest.fn();
        await wrapper.instance().handleSubmit(mockEvent, 'login');
        expect(wrapper.instance().handleLogin).toHaveBeenCalled();
      });

      it('should call HandleNewUser', async() => {
        const mockAddNewUser = jest.fn()
        const mockSignInUser = jest.fn()
        const mockUser = {}
        const mockGetFavoritesThunk = jest.fn()
        const mockEvent = { preventDefault: jest.fn() };
        const wrapper = shallow(<UserForm
          type="signup" addNewUser={mockAddNewUser}signInUser={mockSignInUser}user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
        />);
        wrapper.instance().handleNewUser = jest.fn();
        await wrapper.instance().handleSubmit(mockEvent, 'signup');
        expect(wrapper.instance().handleNewUser).toHaveBeenCalled();
      });


      it('should run handleSubmit on form submit', () => {        
        const mockAddNewUser = jest.fn()
        const mockSignInUser = jest.fn()
        const mockUser = {}
        const mockGetFavoritesThunk = jest.fn()
        const wrapper = shallow(<UserForm
          type="login" addNewUser={mockAddNewUser}signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
        />);
        const e = { preventDefault: jest.fn() }
        wrapper.instance().handleSubmit = jest.fn()

        wrapper.find('form').simulate('submit', e)

        expect(wrapper.instance().handleSubmit).toBeCalledWith(e, 'login')
      })

      it('should not get favorites if there are errors in state', async () => {
        const mockAddNewUser = jest.fn()
        const mockSignInUser = jest.fn()
        const mockUser = {name: 'bob', password: '123', email: 'bob@goodlife.com', id: 1}
        const mockGetFavoritesThunk = jest.fn()
        const wrapper = shallow(<UserForm
          type="login" addNewUser={mockAddNewUser} signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
        />);
        const e = { preventDefault: jest.fn() }
        wrapper.setState({logInError: true})
        await wrapper.find('form').simulate('submit', e)
        expect(mockGetFavoritesThunk).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('handleLogin', () => {
    it('should update state for logged in user', async () => {
      const mockNewUser = {name: 'bob', password: '123', email: 'bob@goodlife.com'}
      signInUserThunk.mockImplementation(()=> {
        return mockNewUser
      })
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn()
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const wrapper = shallow(<UserForm
        addNewUser={mockAddNewUser} signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
      />);
      const expected = true;
      await wrapper.instance().handleLogin(mockNewUser);
      expect(wrapper.state().loggedIn).toEqual(expected);
    })

    it('should update state for error logging in user', async () => {
      const mockNewUser = {name: 'bob', password: '123', email: 'bob@goodlife.com'}
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn().mockImplementation(()=> {
        throw Error('trouble logging in')
      })
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const wrapper = shallow(<UserForm
        addNewUser={mockAddNewUser} signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
      />);
      const expected = true;
      await wrapper.instance().handleLogin(mockNewUser);
      expect(wrapper.state().logInError).toEqual(expected);
    })
  })

  describe('handleNewUser', () => {
    it('should update state for logged in user', async () => {
      const mockNewUser = {name: 'bob', password: '123', email: 'bob@goodlife.com'}
      signInUserThunk.mockImplementation(()=> {
        return mockNewUser
      })
      const mockAddNewUser = jest.fn()
      const mockSignInUser = jest.fn()
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const wrapper = shallow(<UserForm
        addNewUser={mockAddNewUser} signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
      />);
      const expected = true;
      await wrapper.instance().handleNewUser(mockNewUser);
      expect(wrapper.state().loggedIn).toEqual(expected);
    })

    it('should update state for logged in user', async () => {
      const mockNewUser = {name: 'bob', password: '123', email: 'bob@goodlife.com'}
      const mockAddNewUser = jest.fn().mockImplementation(() => {
        throw Error('something')
      })
      const mockSignInUser = jest.fn()
      const mockUser = {}
      const mockGetFavoritesThunk = jest.fn()
      const wrapper = shallow(<UserForm
        addNewUser={mockAddNewUser} signInUser={mockSignInUser} user={mockUser} getFavoritesThunk={mockGetFavoritesThunk}
      />);
      const expected = true;
      await wrapper.instance().handleNewUser(mockNewUser);
      expect(wrapper.state().signInError).toEqual(expected);
    })
  })

})