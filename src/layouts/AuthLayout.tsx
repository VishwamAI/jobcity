import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <header>
        <h1>Job-City</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Job-City. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
