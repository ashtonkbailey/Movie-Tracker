import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
import * as actions from '../../actions/index';
import { Redirect, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFavoritesThunk } from '../../thunks/getFavorites';
import { addNewUserThunk } from '../../thunks/addNewUser';
import { signInUserThunk } from '../../thunks/signInUser';

export class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      loggedIn: false,
      signInError: false,
      logInError: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleSubmit = async (e, type) => {
    e.preventDefault()
    const newUser = {...this.state, loggedIn: true}
    type === 'login'
      ? await this.handleLogin(newUser)
      : await this.handleNewUser(newUser)
    if (!this.state.signInError && !this.state.logInError){
      this.props.getFavoritesThunk(this.props.user.id)
    }
  }

  handleLogin = async (newUser) => {
    newUser.email = newUser.email.toLowerCase()
    try {
      
      const loggedInUser = await this.props.signInUser(newUser)

      this.setState({ loggedIn: true })
    } catch (error) {
      this.setState({ password: '', logInError: true })
    }
  }

  handleNewUser = async (newUser) => {
    try {
      const userId = await this.props.addNewUser(newUser)
      this.setState({ loggedIn: true })
    } catch (error) {
      this.setState({ email: '', password: '', signInError: true })
    }
  }

  render() {
    const { type } = this.props
    const { signInError, logInError } = this.state
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    let errorText
    if (signInError) {
      errorText = 'User email already exists! Please log in or try a different email.'
    } else if (logInError) {
      errorText = 'Email and password do not match.'
    }

    let error = false
    if (signInError || logInError) {
      error = true
    }

    let button
    type === 'login'
      ? button = 'Log In'
      : button = 'Sign Up'

    let headerText
    type === 'login'
      ? headerText = 'Log In'
      : headerText = 'Sign Up'

    let nameInput
    type === 'login'
    ? nameInput = (
      <Link to='/signup'>
        <div className="no-acct-msg">Don't have an account? Sign up <span className="signup-here">here</span>.
        </div>
      </Link>
    )
    : nameInput = (
        <input onChange={this.handleChange}
          name='name'
          value={this.state.name}
          placeholder='Name (optional)'
          type='text'
        />
      )

    return (
      <div className='user-form'>
        <h1 className="header-text">{headerText}</h1>
        <form onSubmit={(e) => this.handleSubmit(e, type)}>
          {nameInput}
          <input onChange={this.handleChange}
            name='email'
            value={this.state.email}
            placeholder='E-mail'
            type='email'
            autoFocus={true}
          />
          <input onChange={this.handleChange}
            name='password'
            value={this.state.password}
            placeholder='Password'
            type='password'
          />
          <button>{button}</button>
        </form>
        <p className={`user-msg ${error && 'error'}`}>{errorText}</p>
      </div>
    )
  }
}

UserForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getFavoritesThunk: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  signInUser: (user) => dispatch(signInUserThunk(user)),
  addNewUser: (user) => dispatch(addNewUserThunk(user)),
  getFavoritesThunk: (userId) => dispatch(getFavoritesThunk(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm));
