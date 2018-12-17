import { fetchMovies } from './apiCalls';

export const cleanMovies = async()=> {
  const uncleanMovies = await fetchMovies()
  const cleanMovies = uncleanMovies.map(movie =>({
      title: movie.title,
      id: movie.id,
      rating: movie.vote_average,
      text: movie.overview,
      release: movie.release_date,
      poster: movie.poster_path
    })
  )
  return cleanMovies;
}