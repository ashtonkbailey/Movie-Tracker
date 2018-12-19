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