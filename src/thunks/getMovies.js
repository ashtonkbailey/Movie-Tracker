import { key } from '../utils/apiKey';
import {setError} from '../actions'

export const getMoviesThunk = () => {
  return async (dispatch) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
      const results = await fetch(url);
      if(!results.ok) {
        throw Error('Could not get movies')
      }
      const movieData = await results.json();
      return movieData.results
    } catch(error) {
      dispatch(setError(error.message))

    }
  }
}
