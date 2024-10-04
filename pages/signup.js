import React from 'react';
import AuthComponent from '../src/components/auth-pages';

const SignupPage = () => {
  return (
    <div>
      <AuthComponent initialIsLogin={false} />
    </div>
  );
};

export default SignupPage;
