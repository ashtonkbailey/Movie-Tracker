import React from 'react';
import '../../index.scss';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDisplay = (props) => {
  const { user } = props
  let button

  if (user.name) {
    button = <button className='control'>Log Out</button>
  } else {
    button = 
      <div className='control-btns'>
        <Link to='/signup'>
          <button className='control'>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button className='control'>Log In</button>
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
