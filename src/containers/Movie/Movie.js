import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../index.scss';
import { addFavoriteThunk } from '../../thunks/addFavorite'
import { getFavoritesThunk } from '../../thunks/getFavorites'
import { removeFavoriteThunk } from '../../thunks/removeFavorite'

import PropTypes from 'prop-types';


export class Movie extends Component {
  
  handleAddFavorite = async () => {
    const { title, id, rating, text, release, poster, user, addFavoriteThunk, getFavoritesThunk, favorites } = this.props;

    let favoriteObj = {
      title: title,
      movie_id: id,
      vote_average: rating,
      overview: text,
      release_date: release,
      poster_path: poster,
      user_id: user.id
    }
    await addFavoriteThunk(favoriteObj, favorites)
    getFavoritesThunk(user.id)
  }

  handleRemoveFavorite = async () => {
    const { id, user, removeFavoriteThunk, getFavoritesThunk } = this.props;

    await removeFavoriteThunk(id, user.id)
    getFavoritesThunk(user.id)
  }

  render() {
    const { title, rating, text, release, poster, user, favorite } = this.props;

    let button
    if (!user.name) {
      button = (
        <Link to='/login'>
          <button className="add-to-favs">Login to Save</button>
        </Link>
      )
    } else if(favorite) {
      button = 
        <button
          onClick={()=>this.handleRemoveFavorite()}
          className="add-to-favs"
        >Remove Favorite</button>
    } else {
      button = 
        <button
          onClick={()=>this.handleAddFavorite()}
          className="add-to-favs"
        >Add to Favorites</button>
    }

    return(
      <div className={`movie ${favorite && 'favorite'}`}>
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
  poster: PropTypes.string.isRequired,
  favorites: PropTypes.array.isRequired,
  addFavoriteThunk: PropTypes.func.isRequired,
  getFavoriteThunk: PropTypes.func.isRequired,
  removeFavoriteThunk: PropTypes.func.isRequired

}

export const mapStateToProps = (state) => ({
  user: state.user,
  favorites: state.favorites
})

export const mapDispatchToProps = (dispatch) => ({
  addFavoriteThunk: (favoriteObj, favorites) => dispatch(addFavoriteThunk(favoriteObj, favorites)),
  getFavoritesThunk: (userId) => dispatch(getFavoritesThunk(userId)),
  removeFavoriteThunk: (userId, movieId) => dispatch(removeFavoriteThunk(userId, movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie);