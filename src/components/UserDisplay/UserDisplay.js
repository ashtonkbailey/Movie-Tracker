import React from 'react';
import '../../index.scss';
import '../../containers/LoginForm/LoginForm';
import '../../containers/SignupForm/SignupForm';

const UserDisplay = () => {

  return(
    <div className='user-display'>
      <LoginForm />
      <SignupForm />
    </div>
  )
}

export default UserDisplay;
