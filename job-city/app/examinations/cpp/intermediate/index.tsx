import React from 'react';

interface Task {
  title: string;
  description: string;
  hints: string[];
}

const CPPIntermediateExam: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Doubly Linked List",
      description: "Create a C++ class for a doubly linked list with methods for insertion, deletion, and traversal.",
      hints: [
        "Use 'new' and 'delete' for dynamic memory allocation and deallocation",
        "Each node should have pointers to both next and previous nodes",
        "Implement both forward and backward traversal methods"
      ]
    },
    {
      title: "Task 2: Exception Handling in File Operations",
      description: "Write a program that reads from a file, processes the data, and writes to another file using proper exception handling.",
      hints: [
        "Use try-catch blocks to handle potential exceptions",
        "Consider exceptions like file not found, permission denied, etc.",
        "Implement proper resource management using RAII principles"
      ]
    },
    {
      title: "Task 3: Use of Templates in C++",
      description: "Create a template function or class that can work with different data types.",
      hints: [
        "Use the 'template' keyword to define a template",
        "Consider implementing a generic sorting algorithm or data structure",
        "Test your template with various data types (int, float, custom classes)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">C++ Intermediate Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Coding Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the C++ Intermediate level examination. Here you will find coding tasks to test your intermediate C++ skills.
                </p>
                {tasks.map((task, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                    {/* Placeholder for code editor */}
                    <div className="mt-2 h-32 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-800">Code Editor Placeholder</p>
                    </div>
                    {/* Hints */}
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-900">Hints</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {task.hints.map((hint, hintIndex) => (
                          <li key={hintIndex}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Placeholder for auto-coding feature */}
                    <div className="mt-4">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Auto-complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CPPIntermediateExam;
