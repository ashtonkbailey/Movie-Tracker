import React, { Component } from 'react';
import '../../index.scss';
import { connect } from 'react-redux';

class App extends Component {
  // remember to add in userComponent
  // if the user is logged in, display userComponent
  // if user is not logged in, display login/signup button
  
  render() {
    return (
      <div className="App">
        <h1>Movie Tracker</h1>
        <MovieDisplay />
      </div>
    );
  }
}

mapStateToProps(state) => ({
  movies: state.movies
})

export default connect(mapStateToProps, null)(App);
