import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../index.scss';
import Movie from '../Movie/Movie';
import PropTypes from 'prop-types';

export class MovieDisplay extends Component {
  // appears to no longer be necessary-- consider removal
  // constructor() {
  //   super()
  //   // this.state = {
  //   //   favoriteDisplay: false
  //   // }
  // }

  render() {
    let movies;
    if (this.props.type === 'home' && this.props.user.email){
      movies = this.props.movies.map(movie => {
        if (this.props.favorites && this.props.favorites.includes(movie.id)) {
          return <Movie {...movie} key= {movie.id} favorite={true} />
        }
        return <Movie {...movie} key={movie.id} favorite={false}/>
      })
    } else if (this.props.type === 'home') {
      movies = this.props.movies.map(movie => <Movie {...movie} key={movie.id} favorite={false}/>)
    } else if (this.props.type === 'favorites' && !this.props.favorites.length){
      movies = <h2 className='nofav'>You have no saved favorites</h2>
    } else {
      movies = this.props.movies.map(movie => {
        if (this.props.favorites && this.props.favorites.includes(movie.id)) {
          return <Movie {...movie} key= {movie.id} favorite={true} />
        }
        return movies;
      })
    }

    let navBtn;

    if (this.props.type === 'home' && this.props.user.email) {
      navBtn = (<Link to="/favorites" className='link'>
                  <button className="navBtn">View favorites</button>
                </Link>)
    } else if (this.props.type === 'favorites' && this.props.user.email) {
      navBtn = (<Link to="/" className='link'>
                  <button className="navBtn">All Movies</button>
                </Link>)
    } 

    return (
      <div className="movie-display">
        {navBtn}
        <div className="movie-container">
          {movies}
        </div>
        <p class="scroll-text">scroll to see all movies</p>
      </div>
    )
  }

}

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
})

export default connect(mapStateToProps, null)(MovieDisplay);
