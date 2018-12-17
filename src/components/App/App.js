import React, { Component } from 'react';
import '../../index.scss';
import { connect } from 'react-redux';
import * as API from '../../api/apiCalls';

class App extends Component {
  constructor(){
    super()
  }
  // remember to add in userComponent
  // if the user is logged in, display userComponent
  // if user is not logged in, display login/signup button
  
  async componentDidMount(){
    console.log('sara')
    const movies = await API.fetchMovies()
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Tracker</h1>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps, null)(App);
