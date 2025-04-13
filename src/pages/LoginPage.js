import React from 'react';
import Login from '../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <Login />
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default LoginPage;