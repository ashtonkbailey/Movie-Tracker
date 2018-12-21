import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../../index.scss';
import Movie from '../../components/Movie/Movie';
import leftArrow from '../../assets/back.png';
import rightArrow from '../../assets/next.png';

import PropTypes from 'prop-types';

class MovieDisplay extends Component {
  constructor() {
    super()
    this.state = {
      favoriteDisplay: false
    }
  }

  render() {
    const allMovies = this.props.movies.map(movie => <Movie {...movie} key={movie.id} />);
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
          {allMovies}
        </div>
      </div>
    )
  }

}

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

export default withRouter(connect(mapStateToProps, null)(MovieDisplay));
