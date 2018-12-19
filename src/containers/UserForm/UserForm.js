import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
//import {logInUserFetchCall} from 'path'
import * as actions from '../../actions/index';
import { Link, Redirect } from 'react-router-dom';


export class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: '',
      loggedIn: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const user = {...this.state, loggedIn: true}
    //const user = await logInUserFetchCall(url, optionsObj)
    this.props.logInUser(user)
    this.setState({ loggedIn: true })
  }

  render() {

    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return(
      <div className='login'>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}
            name='userName'
            value={this.state.userName}
            placeholder='UserName'
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
