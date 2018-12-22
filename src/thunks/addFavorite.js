export const addFavoriteThunk = (favoriteObj, favorites) => {
  return async (dispatch) => {
    try {
      if (favorites.length) {
        let alreadyAFav = favorites.find(favorite => {
          return favorite === favoriteObj.movie_id
        })
        if (alreadyAFav) {
          throw new Error('Already a favorite')
        }
      }
      const url = 'http://localhost:3000/api/users/favorites/new'
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(favoriteObj),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!result.ok) {
        throw new Error('Unable to save to favorites')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
