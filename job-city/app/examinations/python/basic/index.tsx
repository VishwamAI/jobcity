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

const PythonBasicExam: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Hello World",
      description: "Write a Python program that prints \"Hello, World!\" to the console."
    },
    {
      title: "Task 2: Sum of Two Integers",
      description: "Create a Python program that calculates and prints the sum of two integers entered by the user."
    },
    {
      title: "Task 3: Largest of Three Numbers",
      description: "Develop a Python program that finds and displays the largest among three numbers input by the user."
    }
  ];

  const hints: Hint[] = [
    { text: "Use the print() function to output text to the console." },
    { text: "To get user input, you can use the input() function." },
    { text: "Python's if-elif-else statements can be used for comparisons." },
    { text: "Remember to convert user input to integers using int() for mathematical operations." }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Python Basic Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Examination Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Python Basic Examination. Here you will find various
                  tasks to test your basic Python programming skills.
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

export default PythonBasicExam;
