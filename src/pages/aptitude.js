import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AptitudeReasoning = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Aptitude Reasoning - Job-City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Aptitude Reasoning</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Numerical Reasoning', href: '/aptitude/numerical' },
            { name: 'Verbal Reasoning', href: '/aptitude/verbal' },
            { name: 'Logical Reasoning', href: '/aptitude/logical' },
            { name: 'Abstract Reasoning', href: '/aptitude/abstract' },
            { name: 'Spatial Reasoning', href: '/aptitude/spatial' },
          ].map((topic) => (
            <Link key={topic.name} href={topic.href}>
              <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{topic.name}</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Explore {topic.name.toLowerCase()} problems and techniques.</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Formula</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Quadratic Formula</h3>
            <p className="text-gray-600 mb-4">
              The quadratic formula is used to solve quadratic equations of the form ax² + bx + c = 0.
            </p>
            <div className="flex items-center justify-center bg-gray-100 p-4 rounded">
              <span className="text-2xl font-bold text-blue-600">
                x = (-b ± √(b² - 4ac)) / (2a)
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AptitudeReasoning;