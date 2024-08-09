import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const securityLevels = [
  { name: 'Fundamentals', path: '/ai-security/fundamentals', description: 'Introduction to AI security concepts and basics' },
  { name: 'Advanced', path: '/ai-security/advanced', description: 'In-depth exploration of AI security techniques and best practices' },
  { name: 'Expert', path: '/ai-security/expert', description: 'Cutting-edge AI security research and implementation' },
];

export default function AISecurityIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulating authentication check and data loading
    const checkAuth = async () => {
      // TODO: Implement actual authentication logic
      const authStatus = await new Promise(resolve => setTimeout(() => resolve(true), 1000));
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>Please log in to access AI Security content.</p>
        <Link href="/login" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Security - Job-City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Security Learning Paths</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {securityLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{level.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{level.description}</p>
                  <div className="mt-4">
                    <Link href={level.path} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Start Learning
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About AI Security at Job-City</h2>
            <p className="text-gray-600">
              Our AI Security learning paths are designed to equip you with the knowledge and skills needed to navigate
              the complex landscape of AI security. From fundamental concepts to advanced techniques, our curriculum covers
              a wide range of topics including ethical considerations, privacy protection, adversarial attacks, and robust AI systems.
              Join us in exploring the critical intersection of AI and security in a safe, controlled environment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
