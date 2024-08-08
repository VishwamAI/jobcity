import React from 'react';

const CPPBasicExamination: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">C++ Basic Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700">
                  Welcome to the C++ Basic Examination. Here you will find coding tasks to test your basic C++ skills.
                </p>
                {/* Placeholder for tasks */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Task 1: Hello World</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Write a C++ program that prints "Hello, World!" to the console.
                  </p>
                </div>
              </div>

              {/* Placeholder for hints */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Hints</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Remember to include the necessary header files and use the correct output stream.
                </p>
              </div>

              {/* Placeholder for auto-coding feature */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Auto-Coding</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Auto-coding feature coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CPPBasicExamination;
