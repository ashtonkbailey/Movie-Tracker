import userReducer from './usersReducer'

describe('userReducer', () => {
  it('should return the default state', () => {
    const expected = {}
    const result = userReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should log in a user', () => {
    const action = {type: 'LOG_IN_USER', user: {name: 'sally', password: '123', email: 'sally@something.com'}}
    const expected = {name: 'sally', password: '123', email: 'sally@something.com'}
    const result = userReducer({}, action)
    expect(result).toEqual(expected)
  })

  it('should log out a user', () => {
    const state = {name: 'sally', password: '123', email: 'sally@something.com'}
    const action = {type: 'LOG_OUT_USER'}
    const expected = {}
    const result = userReducer(state, action)
    expect(result).toEqual(expected)
  })

})