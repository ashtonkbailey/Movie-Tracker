import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../index.scss';


const Movie = ({ title, id, rating, text, release, poster, user }) => {
  let button
  if (!user.name) {
    button = (
      <Link to='/login'>
        <button className="add-to-favs">Login to Save</button>
      </Link>
    )
  } else {
    button = <button className="add-to-favs">Add to Favorites</button>
  }

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
        {button}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Movie);