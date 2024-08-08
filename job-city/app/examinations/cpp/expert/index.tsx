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

const CPPExpertExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Thread-Safe Singleton",
      description: "Create a thread-safe singleton class in C++ using modern C++11 features. Ensure that only one instance of the class can be created, even in a multi-threaded environment.",
      hints: [
        "Use std::atomic for the instance pointer",
        "Implement a static method for accessing the singleton instance",
        "Consider using std::call_once for initialization"
      ]
    },
    {
      title: "Task 2: Develop a Custom Smart Pointer",
      description: "Implement a custom smart pointer class in C++ that manages dynamically allocated memory. Include features like reference counting and custom deleters.",
      hints: [
        "Overload operators like *, ->, and =",
        "Implement move semantics for efficient transfers",
        "Use std::atomic for thread-safe reference counting"
      ]
    },
    {
      title: "Task 3: Create a Lock-Free Data Structure",
      description: "Implement a lock-free queue or stack data structure in C++ using atomic operations. Ensure that it can be safely used in a multi-threaded environment without explicit locking.",
      hints: [
        "Use std::atomic for shared variables",
        "Implement compare-and-swap (CAS) operations",
        "Consider the ABA problem and how to mitigate it"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">C++ Expert Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Expert C++ Coding Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Expert C++ examination. Here you will find advanced coding tasks to test your C++ expertise.
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
                    Auto-Complete
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

export default CPPExpertExamination;
