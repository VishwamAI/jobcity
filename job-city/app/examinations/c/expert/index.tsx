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

const CExpertExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Memory Pool Allocator",
      description: "Design and implement a memory pool allocator in C that efficiently manages memory allocation and deallocation for objects of fixed size.",
      hints: [
        "Use a linked list to keep track of free memory blocks",
        "Implement functions for initialization, allocation, and deallocation",
        "Consider using macros for alignment and size calculations"
      ]
    },
    {
      title: "Task 2: Develop a Lock-Free Queue",
      description: "Implement a lock-free queue data structure in C using atomic operations to ensure thread-safety without using mutexes.",
      hints: [
        "Use atomic operations from <stdatomic.h>",
        "Implement enqueue and dequeue operations",
        "Handle the ABA problem using version counters"
      ]
    },
    {
      title: "Task 3: Create a Custom Memory Leak Detector",
      description: "Develop a custom memory leak detection tool in C that can be used to identify and report memory leaks in C programs.",
      hints: [
        "Override malloc, calloc, realloc, and free functions",
        "Use a hash table to store allocation information",
        "Implement a reporting mechanism for unfreed allocations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">C Expert Level Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Expert C Programming Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Expert C Programming examination. Here you will find advanced tasks to test your C programming skills.
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
                    Auto-complete
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

export default CExpertExamination;
