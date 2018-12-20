import * as actions from './index';

describe('actions', () => {
  it('addMovies should take in the payload and return an object with a type of ADD_MOVIES', () => {
    const movies = []
    const expected = {
      type: 'ADD_MOVIES',
      movies
    }
    const result = actions.addMovies(movies)
    expect(result).toEqual(expected)
  })

  it('logInUser should take in the payload and return an object with a type of LOG_IN_USER', () => {
    const user = {}
    const expected = {
      type: 'LOG_IN_USER',
      user
    }
    const result = actions.logInUser(user)
    expect(result).toEqual(expected)
  })

  it('logOutUser should return an object with a type of LOG_OUT_USER with no payload', () => {
    const expected = {
      type: 'LOG_OUT_USER'
    }
    const result = actions.logOutUser()
    expect(result).toEqual(expected)
  })

})