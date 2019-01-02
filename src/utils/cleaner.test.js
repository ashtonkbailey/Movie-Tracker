// import { fetchMovies } from './apiCalls'
import { cleanMovies } from './cleaner'
import { getMoviesThunk } from '../thunks/getMovies'

jest.mock('../thunks/getMovies')

describe('cleanMovies', () => {
  beforeEach(() => {
    getMoviesThunk.mockImplementation(() => () => {
      return [
        {
          title: 'Balto',
          id: 1,
          vote_average: 10,
          overview: 'A movie about Balto',
          release_date: "2018-12-07",
          poster_path: '/sG6n4ei1F0kVQtTs3fAjDghngpa.jpg'
        },
        {
          title: 'Balto 2',
          id: 2,
          vote_average: 10,
          overview: 'Another movie about Balto',
          release_date: "2019-12-07",
          poster_path: '/sG6n4ei1F0kVQtTs3fAjDghngpa.jpg'
        }
      ]
    })
  })

  it('should return a cleaned copy of the fetched movies', async () => {
    const expected = [
      {
        title: 'Balto',
        id: 1,
        rating: 10,
        text: 'A movie about Balto',
        release: "2018-12-07",
        poster: '/sG6n4ei1F0kVQtTs3fAjDghngpa.jpg'
      },
      {
        title: 'Balto 2',
        id: 2,
        rating: 10,
        text: 'Another movie about Balto',
        release: "2019-12-07",
        poster: '/sG6n4ei1F0kVQtTs3fAjDghngpa.jpg'
      }
    ]

    const result = await cleanMovies()

    expect(expected).toEqual(result)
  })
})
