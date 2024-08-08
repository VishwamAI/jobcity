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

const GolangIntermediateExam: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Goroutine",
      description: "Create a Golang program that uses goroutines to perform concurrent operations. Implement a function that calculates the sum of numbers in a slice concurrently.",
      hints: [
        "Use the 'go' keyword to start a goroutine",
        "Utilize channels for communication between goroutines",
        "Consider using sync.WaitGroup to wait for all goroutines to finish"
      ]
    },
    {
      title: "Task 2: Create a Web Server",
      description: "Develop a simple HTTP server in Golang that handles GET and POST requests. Implement at least two endpoints with different functionalities.",
      hints: [
        "Use the 'net/http' package to create the server",
        "Implement handler functions for different routes",
        "Test your server using tools like cURL or Postman"
      ]
    },
    {
      title: "Task 3: Use Channels for Communication",
      description: "Write a Golang program that demonstrates the use of channels for communication between goroutines. Implement a producer-consumer pattern.",
      hints: [
        "Create buffered or unbuffered channels as needed",
        "Use select statement for handling multiple channels",
        "Implement proper channel closing to avoid deadlocks"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Golang Intermediate Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Coding Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Golang Intermediate level examination. Here you will find various
                  coding tasks to test your Golang skills.
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

export default GolangIntermediateExam;
