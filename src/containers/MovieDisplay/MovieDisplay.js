import React, {Component} from 'react';
import { connect } from 'react-redux';

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

  render(){
    const allMovies = this.props.movies.map(movie => <Movie {...movie} key={movie.id} />)
    return(
      <div className="movie-display">
        <button className="left arrow" title="scroll left">
          <img src={leftArrow} alt="scroll left" />
        </button>
        <div className="movie-container">
          {allMovies}
        </div>
        <button className="right arrow" title="scroll right">
          <img src={rightArrow} alt="scroll right" />
        </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps, null)(MovieDisplay)