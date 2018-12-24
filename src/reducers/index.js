import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import userReducer from './usersReducer';
import { favoritesReducer}  from './favoritesReducer';
import { errorReducer } from './errorReducer'

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  favorites: favoritesReducer,
  error: errorReducer
})

export default rootReducer;
