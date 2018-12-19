import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
import { addNewUserFetch, getAllUsersFetch } from '../../utils/apiCalls'
import * as actions from '../../actions/index';
import { Redirect } from 'react-router-dom';

export class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      loggedIn: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleSubmit = async (e, type) => {
    e.preventDefault()
    const newUser = {...this.state}
    const allUsers = await getAllUsersFetch()
    const repeatUser = allUsers.find(user => user.email === newUser.email)
    type === 'login'
      ? this.handleLogin(repeatUser, newUser)
      : this.handleNewUser(repeatUser, newUser)
  }

  handleLogin = (repeatUser, newUser) => {
    if (!repeatUser) {
      console.log('Couldn\'t find email')
    } else if (repeatUser.password !== newUser.password) {
      console.log('Incorrect Password')
    } else {
      this.props.logInUser(newUser)
      this.setState({ loggedIn: true })
    }
  }

  handleNewUser = async (repeatUser, newUser) => {
    if (!repeatUser) {
      await addNewUserFetch(newUser)
      this.props.logInUser(newUser)
      this.setState({ loggedIn: true })
    } else {
      console.log('No Repeat Emails!')
    }
  }

  render() {
    const { type } = this.props
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    let button
    type === 'login'
      ? button = 'Log In'
      : button = 'Sign Up'

    return(
      <div className='login'>
        <form onSubmit={(e) => this.handleSubmit(e, type)}>
          <input onChange={this.handleChange}
            name='name'
            value={this.state.name}
            placeholder='name'
            type='text'
            />
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
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  logInUser: (user) => dispatch(actions.logInUser(user))
})

export default connect(null, mapDispatchToProps)(UserForm);
