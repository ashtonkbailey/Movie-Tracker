import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../index.scss';
import * as clean from '../../utils/cleaner';
import * as actions from '../../actions/index';
import MovieDisplay from '../../containers/MovieDisplay/MovieDisplay';
import UserDisplay from '../../containers/UserDisplay/UserDisplay';
import UserForm from '../../containers/UserForm/UserForm';

class App extends Component {
  // remember to add in userComponent
  // if the user is logged in, display userComponent
  // if user is not logged in, display login/signup button
  
  async componentDidMount(){
    const movies = await clean.cleanMovies()
      this.props.addMovies(movies)
    }


  render() {
    // will need to add a default/error page to router

    return (
      <div className="App">
        <Link to="/">
          <h1>
            Movie
            <br/>
            Tracker
          </h1>
        </Link>
        <UserDisplay />
        <Switch>
          <Route exact path='/' render={() => <MovieDisplay type="home" />} />
          <Route path='/favorites' render={() => <MovieDisplay type="favorites" />} />
          <Route path='/signup' render={() => <UserForm type="signup" />} />
          <Route path='/login' render={() => <UserForm type="login" />} />
          <Route path='' render={() => 
            (<div>
              <h1>Oops! Couldn't find that page!</h1>
              <Link to='/'><button className="go-home">E.T. Phone Home</button></Link>
            </div>)
          } />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
