import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps, UserDisplay } from './UserDisplay'
import { logOutUser, clearFavorites } from '../../actions/index';

describe('UserDisplay', () => {
  let mockUser

  beforeEach(() => {
    mockUser = { name: 'Bob', email: 'bob@gmail.com', password: 'bob' }
  })

  describe('UserDisplay Component', () => {
    it('should match the snapshot', () => {
      const mockLogOutUser = jest.fn()
      const mockClearFavorites = jest.fn()
      const wrapper = shallow(<UserDisplay user={mockUser} logOutUser={mockLogOutUser} clearFavorites={mockClearFavorites}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const mockLogOutUser = jest.fn()
      const mockClearFavorites = jest.fn()
      const wrapper = shallow(<UserDisplay user={noUser} logOutUser={mockLogOutUser} clearFavorites={mockClearFavorites}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should call logOutUser and clearFavorites', () => {
      const mockLogOutUser = jest.fn()
      const mockClearFavorites = jest.fn()
      const wrapper = shallow(<UserDisplay user={mockUser} logOutUser={mockLogOutUser} clearFavorites={mockClearFavorites}/>)
      wrapper.find('Link').first().simulate('click')
      expect(mockLogOutUser).toBeCalled()
      expect(mockClearFavorites).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { user: mockUser }
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(mockState)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method logOutUser', () => {
      const mockDispatch = jest.fn()
      const expected = logOutUser()
      const expected2 = clearFavorites()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logOutUser()
      mappedProps.clearFavorites()

      expect(mockDispatch).toHaveBeenNthCalledWith(1, expected)
      expect(mockDispatch).toHaveBeenNthCalledWith(2, expected2)
    })
  })
})