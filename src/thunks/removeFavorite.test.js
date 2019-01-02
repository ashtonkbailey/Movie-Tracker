import { removeFavoriteThunk } from './removeFavorite'
import { setError } from '../actions'

describe('removeFavoriteThunk', () => {
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('should throw an error if result is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Unable to remove favorite'
    }))

    const thunk = removeFavoriteThunk(1, 1)

    await thunk(mockDispatch) 

    expect(mockDispatch).toBeCalledWith(setError('Unable to remove favorite'))
  })

  it('should not set error if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = removeFavoriteThunk(1, 1)

    await thunk(mockDispatch) 

    expect(mockDispatch).toHaveBeenCalledTimes(0)
  })
})