import React from 'react';
import '../../index.scss';


const Movie = ({ title, id, rating, text, release, poster }) => {
  return(
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt='' />
      <div className="movie-info">
        <div className="rating">
          <span>{rating.toFixed(1)}</span>
          <i className="fas fa-star" />
          </div>
        <h2>{title}</h2>
        <h5>{release}</h5>
        <p>{text}</p>
        <button className="add-to-favs">Add to Favorites</button>
      </div>
    </div>
  )
}

export default Movie;