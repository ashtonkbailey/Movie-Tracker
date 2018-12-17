import { key } from './apiKey'

export const fetchMovies = async() => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
  const results = await fetch(url);
  const movieData = await results.json();
  console.log(movieData)
  return movieData
}

