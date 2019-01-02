import { errorReducer } from './errorReducer'

describe('errorReducer', () => {
  it('should return the correct default state', () => {
    const result = errorReducer(undefined, {})
    expect(result).toEqual('')
  })

  it('should return an error message if type is SET_ERROR', () => {
    const error = 'Oh no!'
    const action = {
      type: 'SET_ERROR',
      error
    }
    const result = errorReducer(undefined, action)

    expect(result).toEqual(error)
  })
})