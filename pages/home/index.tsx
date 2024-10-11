import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Job-City</h1>
      <nav>
        <ul>
          <li><Link href="/auth/login">Login</Link></li>
          <li><Link href="/auth/register">Register</Link></li>
          <li><Link href="/more/about">About</Link></li>
          <li><Link href="/more/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
