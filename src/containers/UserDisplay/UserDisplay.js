import React from 'react';
import '../../index.scss';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logOutUser, clearFavorites } from '../../actions/index';
import PropTypes from 'prop-types';

export const UserDisplay = (props) => {
  const { user } = props
  let button

  if (user.name) {
    button = 
      <Link 
        to='/'
        onClick={() => {
          props.logOutUser()
          props.clearFavorites()
        }}>
        <button 
          className='control'
        >Log Out</button>
      </Link>
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

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  clearFavorites: () => dispatch(clearFavorites())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDisplay);

UserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired
}