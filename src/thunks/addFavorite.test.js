import { addFavoriteThunk } from './addFavorite'

describe('addFavoriteThunk', () => {
  let mockUrl
  let mockFav
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.test.com'
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
    // window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    //   ok: false,
    //   statusText: 'Unable to save favorite'
    // }))

    // const thunk = addFavoriteThunk(mockUrl)

    // await thunk(mockDispatch)

  })
})