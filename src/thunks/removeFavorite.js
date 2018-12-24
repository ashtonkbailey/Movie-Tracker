import { setError } from '../actions'

export const removeFavoriteThunk = (id, userId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/users/${userId}/favorites/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({movie_id: id, id: userId}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw Error ('Unable to remove favorite')
      }
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}