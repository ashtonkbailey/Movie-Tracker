import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
import Movie from '../../components/Movie/Movie';

class MovieDisplay extends Component {
  constructor() {
    super()
    this.state = {
      favoriteDisplay: false
    }
  }

  render(){
    const allMovies = this.props.movies.map(movie => <Movie {...movie} key={movie.id}/>)
    return(
      <div>
        {allMovies}
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps, null)(MovieDisplay)