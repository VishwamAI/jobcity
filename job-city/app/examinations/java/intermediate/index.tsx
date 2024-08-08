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

const JavaIntermediateExam: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Generic Class",
      description: "Create a generic class in Java that can work with different data types. Demonstrate its usage with at least two different types.",
      hints: [
        "Use the syntax 'class ClassName<T>' to define a generic class",
        "Implement methods that use the generic type T",
        "Show examples using the class with Integer and String types"
      ]
    },
    {
      title: "Task 2: Exception Handling and File I/O",
      description: "Write a Java program that reads from a file, processes the data, and writes to another file. Implement proper exception handling.",
      hints: [
        "Use try-with-resources for automatic resource management",
        "Handle specific exceptions like FileNotFoundException and IOException",
        "Use BufferedReader for reading and BufferedWriter for writing"
      ]
    },
    {
      title: "Task 3: Multithreading",
      description: "Create a multithreaded application in Java that demonstrates thread synchronization and communication.",
      hints: [
        "Extend the Thread class or implement the Runnable interface",
        "Use the synchronized keyword for thread-safe methods",
        "Implement wait() and notify() for thread communication"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Java Intermediate Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Coding Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Java Intermediate level examination. Here you will find coding tasks to test your Java skills.
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

export default JavaIntermediateExam;
