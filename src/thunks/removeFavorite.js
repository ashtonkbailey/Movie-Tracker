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
        throw Error ('Could not delete this from favorites, you are stuck with this bad movie for ever!!!!!!')
      }
      const result = await response.json()
      console.log('response', result)
    } catch (error) {
      console.log(error)
    }
  }
}