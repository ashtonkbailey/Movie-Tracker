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
      const favoriteIds = favorites.data.map(favorite => favorite.movie_id)
      dispatch(getFavorites(favoriteIds))
    } catch (error) {
      console.log(error)
    }
  }
}
