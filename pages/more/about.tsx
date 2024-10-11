import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div>
      <h1>About Job-City</h1>
      <p>Job-City is a platform designed to connect job seekers with employers, making the job search process easier and more efficient.</p>
      <p>Our mission is to help people find meaningful employment opportunities and assist companies in finding the right talent for their needs.</p>
      <h2>Key Features:</h2>
      <ul>
        <li>Advanced job search capabilities</li>
        <li>User-friendly interface for both job seekers and employers</li>
        <li>Resume builder and management tools</li>
        <li>Company profiles and reviews</li>
        <li>Interview preparation resources</li>
      </ul>
      <p>Thank you for choosing Job-City for your career journey!</p>
      <Link href="/home">Back to Home</Link>
    </div>
  );
};

export default About;
