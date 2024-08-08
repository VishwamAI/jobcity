import React from 'react';

interface Task {
  title: string;
  description: string;
}

interface Hint {
  text: string;
}

const Task: React.FC<Task> = ({ title, description }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
  </div>
);

const Hint: React.FC<Hint> = ({ text }) => (
  <li className="text-sm text-gray-600">{text}</li>
);

const CIntermediateExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Singly Linked List",
      description: "Create a singly linked list data structure with functions for insertion, deletion, and traversal."
    },
    {
      title: "Task 2: File Handling",
      description: "Write a program that reads data from a file, processes it, and writes the results to another file."
    },
    {
      title: "Task 3: Pointer Manipulation",
      description: "Implement a function that uses pointers to swap the values of two variables without using a temporary variable."
    }
  ];

  const hints: Hint[] = [
    { text: "Use malloc() for dynamic memory allocation in the linked list implementation." },
    { text: "Remember to free allocated memory to prevent memory leaks." },
    { text: "Use fopen(), fread(), fwrite(), and fclose() for file operations." },
    { text: "Consider using the XOR operation for the pointer swap task." }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">C Programming - Intermediate Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Intermediate C Programming Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Intermediate C Programming examination. Here you will find various
                  tasks to test your knowledge of advanced C concepts.
                </p>
                {tasks.map((task, index) => (
                  <Task key={index} {...task} />
                ))}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Hints</h3>
                  <ul className="list-disc pl-5 mt-2">
                    {hints.map((hint, index) => (
                      <Hint key={index} {...hint} />
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Auto-Coding Assistant</h3>
                  <div className="mt-2 h-32 bg-blue-100 flex items-center justify-center">
                    <p className="text-blue-800">Auto-Coding Feature Coming Soon</p>
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

export default CIntermediateExamination;
