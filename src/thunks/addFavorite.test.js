import { addFavoriteThunk } from './addFavorite'
import { setError } from '../actions'

describe('addFavoriteThunk', () => {
  let mockFav
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockFav = {
      title: 'Balto',
      movie_id: 1,
      vote_average: 10,
      overview: 'A movie about Balto',
      release_date: "2018-12-07",
      poster_path: '/sG6n4ei1F0kVQtTs3fAjDghngpa.jpg',
      user_id: 1
    }
  })

  it('should throw an error if result is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Unable to save to favorite'
    }))

    const thunk = addFavoriteThunk(mockFav, [])

    await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Unable to save to favorites'))
  })

  it('should throw an error if already a favorite', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Already a favorite'
    }))

    const thunk = addFavoriteThunk(mockFav, [1])

    await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Already a favorite'))
  })

  it('should not throw an error if ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = addFavoriteThunk(mockFav, [4])

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledTimes(0)
  })
})