import { favoritesReducer } from './favoritesReducer'

describe('favoritesReducer', () => {
  it('should return the correct default state', () => {
    const result = favoritesReducer(undefined, {})
    expect(result).toEqual([])
  })

  it('should return favorites if type is GET_FAVORITES', () => {
    const favorites = [12, 67, 23]
    const action = {
      type: 'GET_FAVORITES',
      favorites
    }
    const result = favoritesReducer(undefined, action)

    expect(result).toEqual(favorites)
  })
})