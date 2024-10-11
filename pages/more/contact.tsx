import React, { FormEvent } from 'react';
import Link from 'next/link';

const Contact: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Please use the form below to get in touch with us.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      <h2>Contact Information</h2>
      <p>Email: info@jobcity.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Job Street, Employment City, Work State 12345</p>
      <Link href="/home">Back to Home</Link>
    </div>
  );
};

export default Contact;
