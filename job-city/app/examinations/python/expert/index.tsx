import React from 'react';

interface Task {
  title: string;
  description: string;
  hints: string[];
}

const Task: React.FC<Task> = ({ title, description, hints }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
    <div className="mt-2">
      <h4 className="text-md font-medium text-gray-900">Hints</h4>
      <ul className="list-disc pl-5 mt-1">
        {hints.map((hint, index) => (
          <li key={index} className="text-sm text-gray-600">{hint}</li>
        ))}
      </ul>
    </div>
  </div>
);

const PythonExpertExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Concurrent Web Crawler",
      description: "Create a Python program that crawls web pages concurrently using asyncio and aiohttp. Implement proper rate limiting and error handling.",
      hints: [
        "Use asyncio for managing concurrent tasks",
        "Implement a semaphore for rate limiting",
        "Handle common exceptions like connection errors and timeouts"
      ]
    },
    {
      title: "Task 2: Design a Custom Metaclass",
      description: "Implement a metaclass in Python that modifies class behavior. For example, create a metaclass that automatically logs method calls for any class using it.",
      hints: [
        "Define the metaclass by inheriting from type",
        "Override __new__ or __init__ methods of the metaclass",
        "Use the __call__ method to wrap class methods for logging"
      ]
    },
    {
      title: "Task 3: Implement a Memory-Efficient Data Structure",
      description: "Create a custom data structure in Python that efficiently handles large datasets. Implement methods for insertion, deletion, and searching.",
      hints: [
        "Consider using __slots__ for memory optimization",
        "Implement lazy loading for large datasets",
        "Use appropriate algorithms for efficient searching and sorting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Python Expert Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Expert Level Python Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Python Expert level examination. Here you will find advanced Python programming tasks to test your expertise.
                </p>
                {tasks.map((task, index) => (
                  <Task key={index} {...task} />
                ))}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Code Editor</h3>
                  <div className="mt-2 h-32 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-800">Code Editor Placeholder</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Auto-Complete Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PythonExpertExamination;
