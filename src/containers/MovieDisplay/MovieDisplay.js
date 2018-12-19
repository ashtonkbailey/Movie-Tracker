import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../index.scss';
import Movie from '../../components/Movie/Movie';
import leftArrow from '../../assets/back.png';
import rightArrow from '../../assets/next.png';

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

    if (this.props.type === 'home') {
      navBtn = (<Link to="/favorites" className='link'>
                  <button className="navBtn">View favorites</button>
                </Link>)
    } else {
      navBtn = (<Link to="/" className='link'>
                  <button className="navBtn">All Movies</button>
                </Link>)
    }

    return (
      <div className="movie-display">
        {navBtn}
        <button title="scroll left" className='scroll-btn'>
          <img className="left arrow" src={leftArrow} alt="scroll left" />
        </button>
        <div className="movie-container">
          {allMovies}
        </div>
        <button title="scroll right" className='scroll-btn'>
          <img className="right arrow" src={rightArrow} alt="scroll right" />
        </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps, null)(MovieDisplay)