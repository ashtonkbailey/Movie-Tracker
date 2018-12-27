import { getFavoritesThunk } from './getFavorites'
import { getFavorites, setError } from '../actions';

describe('getFavoritesThunk', () => {
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('should throw an error if result is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Unable to get your favorites'
    }))

    const thunk = getFavoritesThunk()

    await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Unable to get your favorites'))
  })

  it('should dispatch getFavorites if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [{ movie_id: 1 }] })
    }))

    const thunk = getFavoritesThunk(1)

    await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(getFavorites([1]))
  })
})