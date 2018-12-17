import React from 'react';
import '../../index.scss';


const Movie = ({ title, id, rating, text, release, poster }) => {

  return(
    <div>
      {title}
    </div>
  )
}

export default Movie;