import { getFavorites } from '../actions/index'

export const getFavoritesThunk = (userId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/users/${userId}/favorites`
      const result = await fetch(url)
      if (!result.ok) {
        throw new Error('Unable to get your favorites')
      }
      const favorites = await result.json()
      dispatch(getFavorites(favorites.data))
    } catch (error) {
      console.log(error)
    }
  }
}
