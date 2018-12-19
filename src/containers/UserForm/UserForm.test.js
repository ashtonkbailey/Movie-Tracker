import { UserForm, mapDispatchToProps } from './UserForm';
import * as actions from '../../actions/index'

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

    it('should return a props obj with the method addUser', () => {
      const mockDispatch = jest.fn()
      const mockUser = {name: 'sally', email: 'sally@example.com', password: 'passwords'}
       const action = actions.addUser(mockUser)

       const mappedProps = mapDispatchToProps(mockDispatch)
       mappedProps.addUser(mockUser)

       expect(mockDispatch).toHaveBeenCalledWith(action)
    })

  })


})