import React from 'react';
import { GOOGLE_AUTH_URL } from '../src/constants';

const SignIn = () => {
  return (
    <div>
      SignIn
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src="./google-logo.png" alt="Google" /> Log in with Google
      </a>
    </div>
  );
};

export default SignIn;
