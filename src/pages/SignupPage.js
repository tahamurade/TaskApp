import React from 'react';
import Signup from '../components/Signup';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="auth-page">
      <Signup />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;