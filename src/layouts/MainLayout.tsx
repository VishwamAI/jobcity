import React, { ReactNode } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
        <nav>
          <ul>
            <li><Link href="/home">Home</Link></li>
            <li><Link href="/auth/login">Login</Link></li>
            <li><Link href="/auth/register">Register</Link></li>
            <li><Link href="/more/about">About</Link></li>
            <li><Link href="/more/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Job-City. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
