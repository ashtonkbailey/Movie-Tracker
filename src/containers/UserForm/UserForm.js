import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
import { addNewUserFetch, signInUser } from '../../utils/apiCalls'
import * as actions from '../../actions/index';
import { Redirect, withRouter } from 'react-router-dom';

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
      ? this.handleLogin(newUser)
      : this.handleNewUser(newUser)
  }

  handleLogin = async (newUser) => {
    newUser.email = newUser.email.toLowerCase()
    try {
      const loggedInUser = await signInUser(newUser)
      this.props.logInUser({...loggedInUser})
      this.setState({ loggedIn: true })
    } catch (error) {
      this.setState({ password: '', logInError: true })
    }
  }

  handleNewUser = async (newUser) => {
    try {
      await addNewUserFetch(newUser)
      this.props.logInUser(newUser)
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
    ? nameInput = <div></div>
    : nameInput = (
        <input onChange={this.handleChange}
          name='name'
          value={this.state.name}
          placeholder='Name'
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

export const mapDispatchToProps = (dispatch) => ({
  logInUser: (user) => dispatch(actions.logInUser(user))
})

export default withRouter(connect(null, mapDispatchToProps)(UserForm));
