// movie actions
/////// add movies
export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies,
});

// user actions
//////// add favorite, delete favorite, sign in, sign out, create user

export const logInUser = (user) => ({
  type: 'LOG_IN_USER',
  user,
});

export const logOutUser = () => ({
  type: 'LOG_OUT_USER',
});

export const getFavorites = (favorites) => ({
  type: 'GET_FAVORITES',
  favorites
})

export const clearFavorites = () => ({
  type: 'CLEAR_FAVORITES'
})

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
})

export const clearError = () => ({
  type: 'CLEAR_ERROR'
})