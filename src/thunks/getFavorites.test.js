import { getFavoritesThunk } from './getFavorites'
import { getFavorites } from '../actions';

describe('getFavoritesThunk', () => {
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('should throw an error if result is not ok', async () => {
    // window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    //   ok: false,
    //   statusText: 'Unable to save favorite'
    // }))

    // const thunk = addFavoriteThunk(mockUrl)

    // await thunk(mockDispatch)


    // I think we will need some sort of global error state which can be set with an actin. This will probably help with our UI error handling but will also make testing the rest of the thunks possible.
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