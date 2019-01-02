import { getMoviesThunk } from './getMovies'
import { setError } from '../actions'

describe('getMoviesThunk', () => {
  let mockDispatch
  let mockMovies

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockMovies = [{title: 'One', id: 111}, {title: 'two', id: 222}]
  })

  it('should return movies', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => ({results: mockMovies})
      })
    })
    const thunk = getMoviesThunk()
    const result = await thunk(mockDispatch)
    expect(result).toEqual(mockMovies)
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    const thunk = getMoviesThunk()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Could not get movies'))
  })
})
