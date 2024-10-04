import React from 'react';
import AuthComponent from '../src/components/auth-pages';

const LoginPage = () => {
  return (
    <div>
      <AuthComponent initialIsLogin={true} />
    </div>
  );
};

export default LoginPage;
