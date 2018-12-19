import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import userReducer from './usersReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer
})

export default rootReducer;
