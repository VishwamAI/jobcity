import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Job-City Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-2xl font-semibold mb-4">Aptitude Reasoning</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700">
                  Welcome to the Aptitude Reasoning section. Here you will find various
                  formulas and explanations to enhance your problem-solving skills.
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Sample Formula</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Pythagorean Theorem: a² + b² = c²
                  </p>
                  {/* Placeholder for formula animation */}
                  <div className="mt-2 h-32 bg-blue-100 flex items-center justify-center">
                    <p className="text-blue-800">Formula Animation Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
