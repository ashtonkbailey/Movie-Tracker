import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../index.scss';
//import { postNewUserFetchCall } from 'path'

class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, email } = e.target
    this.setState([name]: value)
  }

  handleSubmit = async (e) => {
    e.preventDefault() 
    // const user = await postNewUserFetchCall(url, optionsObj)
    // this.props.addUser()
    this.setState(userName: '', e-mail: '', password:'')
  }

  render() {

    return(
      <div className='signup'>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}
            name='userName'
            value={this.state.userName}
            placeholder='UserName'
            type='text'
            />
          <input onChange={this.handleChange}
            name='email'
            value={this.state.e-mail}
            placeholder='E-mail'
            type='e-mail'
            />
          <button>Create Account</button>
        </form>
      </div>
    )
  } 
}

const mapDispachToProps = (dispach) => ({
  addUser: (this.state) => dispach(actions.addUser(this.state))
})

export default connect(null, mapDispachToProps)(SignupForm);

