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
    {/* Placeholder for code editor */}
    <div className="mt-2 h-32 bg-gray-100 flex items-center justify-center">
      <p className="text-gray-800">Code Editor Placeholder</p>
    </div>
    <div className="mt-2">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Auto-Complete
      </button>
    </div>
  </div>
);

const GolangExpertExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Concurrent Web Crawler",
      description: "Design and implement a concurrent web crawler in Go that can efficiently crawl multiple websites simultaneously. The crawler should handle rate limiting, respect robots.txt, and implement proper error handling.",
      hints: [
        "Use goroutines for concurrent crawling",
        "Implement a worker pool to manage concurrency",
        "Use channels for communication between goroutines",
        "Implement exponential backoff for rate limiting"
      ]
    },
    {
      title: "Task 2: Design a Distributed Key-Value Store",
      description: "Create a distributed key-value store in Go that can handle high concurrency and scale horizontally. The system should support basic operations like get, set, and delete with configurable consistency levels.",
      hints: [
        "Use gRPC for communication between nodes",
        "Implement the Raft consensus algorithm for consistency",
        "Use Go's sync package for local concurrency control",
        "Implement a gossip protocol for cluster membership"
      ]
    },
    {
      title: "Task 3: Optimize a High-Performance Data Pipeline",
      description: "Develop a high-performance data processing pipeline in Go that can handle large volumes of data efficiently. The pipeline should support parallel processing, backpressure handling, and be easily extensible.",
      hints: [
        "Use Go's io.Reader and io.Writer interfaces for streaming",
        "Implement the Fan-out, Fan-in pattern for parallel processing",
        "Use buffered channels for backpressure handling",
        "Consider using reflection for dynamic pipeline configuration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Golang Expert Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Expert Level Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Golang Expert level examination. Here you will find advanced tasks to test your Golang expertise.
                </p>
                {tasks.map((task, index) => (
                  <Task key={index} {...task} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GolangExpertExamination;
