import React, { Component } from 'react';
import '../../index.scss';
import { connect } from 'react-redux';
import * as clean from '../../utils/cleaner';
import * as actions from '../../actions/index';
import MovieDisplay from '../../containers/MovieDisplay/MovieDisplay';

class App extends Component {
  constructor(){
    super()
  }
  // remember to add in userComponent
  // if the user is logged in, display userComponent
  // if user is not logged in, display login/signup button
  
  async componentDidMount(){
    const movies = await clean.cleanMovies()
    this.props.addMovies(movies)
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Tracker</h1>
        <MovieDisplay />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies)=>dispatch(actions.addMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
