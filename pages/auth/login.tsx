import React from 'react';
import Link from 'next/link';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link href="/auth/register">Register</Link>
      </p>
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Login;
