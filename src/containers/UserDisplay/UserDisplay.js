import React from 'react';
import '../../index.scss';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logOutUser } from '../../actions/index';
import PropTypes from 'prop-types';

const UserDisplay = (props) => {
  const { user } = props
  let button

  if (user.name) {
    button = 
      <button 
        className='control'
        onClick={props.logOutUser}
      >Log Out</button>
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

UserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDisplay);
