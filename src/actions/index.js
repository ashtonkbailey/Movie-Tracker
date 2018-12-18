// movie actions
/////// add movies
export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies,
});

// user actions
//////// add favorite, delete favorite, sign in, sign out, create user

export const addUser = (user) => ({
  type: 'ADD_USER',
  user,
});

export const logInUser = (user) => ({
  type: 'LOG_IN_USER',
  user,
});

export const logOutUser = (user) => ({
  type: 'LOG_OUT_USER',
  user,
});