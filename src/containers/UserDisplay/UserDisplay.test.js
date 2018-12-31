import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps, UserDisplay } from './UserDisplay'
import { logOutUser } from '../../actions/index';

describe('UserDisplay', () => {
  let mockUser

  beforeEach(() => {
    mockUser = { name: 'Bob', email: 'bob@gmail.com', password: 'bob' }
  })

  describe('UserDisplay Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<UserDisplay user={mockUser} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<UserDisplay user={noUser} />)
      expect(wrapper).toMatchSnapshot()
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

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logOutUser()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})