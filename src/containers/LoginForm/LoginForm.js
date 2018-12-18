import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
//import {logInUserFetchCall} from 'path'


class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState([name]: value)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    //const user = await logInUserFetchCall(url, optionsObj)
    //this.props.logInUser()
    this.setState({
      userName: '',
      email: '',
      password:''
    })
  }

  render() {

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

const mapDispachToProps = (dispach) => ({
  logInUser: (this.state) => dispach(actions.logInUser(this.state))
})

export default connect(null, mapDispachToProps)(LoginForm);
