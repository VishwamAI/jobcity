import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const levels = [
  { name: 'Basics', path: '/ai-research/basics', description: 'Introduction to AI concepts and fundamentals' },
  { name: 'Intermediate', path: '/ai-research/intermediate', description: 'Advanced AI algorithms and techniques' },
  { name: 'Expert', path: '/ai-research/expert', description: 'Cutting-edge AI research and applications' },
];

export default function AIResearch() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Research - Job-City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Research Learning Paths</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {levels.map((level, index) => (
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
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About AI Research at Job-City</h2>
            <p className="text-gray-600">
              Our AI Research learning paths are designed to guide you through the exciting world of Artificial Intelligence. 
              Whether you're just starting out or looking to deepen your expertise, our AI-driven curriculum adapts to your 
              skill level and learning pace. Explore cutting-edge topics, engage with interactive exercises, and stay up-to-date 
              with the latest advancements in AI technology.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}