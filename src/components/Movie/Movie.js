import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../index.scss';
import { addFavorite, getFavorites } from '../../utils/apiCalls';
import PropTypes from 'prop-types';


class Movie extends Component {
  
  handleAddFavorite = async () => {
    const { title, id, rating, text, release, poster, user } = this.props;

    let favoriteObj = {
      title: title,
      movie_id: id,
      vote_average: rating,
      overview: text,
      release_date: release,
      poster_path: poster,
      user_id: user.id
    }
    try {
      await addFavorite(favoriteObj)
      const favorites = await getFavorites(user.id)
    } catch(error) {
      console.log(error)
    } 
  }

  render() {
    const { title, id, rating, text, release, poster, user } = this.props;

    let button
    if (!user.name) {
      button = (
        <Link to='/login'>
          <button className="add-to-favs">Login to Save</button>
        </Link>
      )
    } else {
      button = 
        <button
          onClick={()=>this.handleAddFavorite()}
          className="add-to-favs"
        >Add to Favorites</button>
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
}

Movie.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired, 
  poster: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Movie);