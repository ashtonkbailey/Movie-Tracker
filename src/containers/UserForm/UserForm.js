import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
import { addNewUserFetch, getAllUsersFetch } from '../../utils/apiCalls'
import * as actions from '../../actions/index';
import { Link, Redirect } from 'react-router-dom';
import { get } from 'http';


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
    if (type === 'login') {
      this.props.logInUser(newUser)
    } else {
      const allUsers = await getAllUsersFetch()
      const repeatUser = allUsers.find(user => user.email === newUser.email)
      if (!repeatUser) {
        await addNewUserFetch(newUser)
      } else {
        console.log('No Repeat Emails!')
      }
      // Can refactor to use only one action creator (setCurrentUser)
      this.props.addUser(newUser)
    }
    this.setState({ loggedIn: true })
  }

  render() {
    const { type } = this.props
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

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
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  logInUser: (user) => dispatch(actions.logInUser(user)),
  addUser: (user) => dispatch(actions.addUser(user))
})

export default connect(null, mapDispatchToProps)(UserForm);
