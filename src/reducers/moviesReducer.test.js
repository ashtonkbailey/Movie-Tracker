import moviesReducer from './moviesReducer';
import * as actions from '../actions/index'

describe('moviesReducer', () => {
  it('should return the default state', () => {
    const expected = []
    const result = moviesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return a new state when movies are added', () => {
    const movies = [{name: 'Ghost', otherthing: 'this is a movie'}]
    const action = {
      type: 'ADD_MOVIES',
      movies
    }
    const expected = [{name: 'Ghost', otherthing: 'this is a movie'}]
    const result = moviesReducer([], action)
    expect(result).toEqual(expected)
  })

})