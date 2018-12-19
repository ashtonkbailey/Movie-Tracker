import React from 'react';
import '../../index.scss';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDisplay = (props) => {
  const { user } = props
  let button

  if (user.name) {
    button = <button>Log Out</button>
  } else {
    button = 
      <div>
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button>Log In</button>
        </Link>
      </div>
  }

  return(
    <div className='user-display'>
      {button}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(UserDisplay);
