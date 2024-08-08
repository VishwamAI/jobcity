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

const JavaExpertExamination: React.FC = () => {
  const tasks: Task[] = [
    {
      title: "Task 1: Implement a Concurrent Web Crawler",
      description: "Design and implement a multi-threaded web crawler in Java that can efficiently crawl websites concurrently. The crawler should handle rate limiting, respect robots.txt, and implement proper error handling.",
      hints: [
        "Use the java.util.concurrent package for managing threads",
        "Implement a thread pool using ExecutorService",
        "Use atomic operations for shared counters",
        "Implement exponential backoff for rate limiting"
      ]
    },
    {
      title: "Task 2: Design a Scalable Caching System",
      description: "Implement a distributed caching system in Java that can handle high concurrency and scale horizontally. The system should support basic operations like get, set, and delete with configurable expiration times.",
      hints: [
        "Use the Observer pattern for cache invalidation",
        "Implement the Consistent Hashing algorithm for distribution",
        "Use Java NIO for non-blocking I/O operations",
        "Consider using off-heap memory for large datasets"
      ]
    },
    {
      title: "Task 3: Optimize a Big Data Processing Pipeline",
      description: "Develop a high-performance data processing pipeline in Java that can handle large volumes of data efficiently. The pipeline should support parallel processing, backpressure handling, and be easily extensible.",
      hints: [
        "Use the Fork/Join framework for parallel processing",
        "Implement the Reactive Streams specification for backpressure",
        "Use memory-mapped files for handling large datasets",
        "Implement custom serialization for improved performance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Java Expert Examination</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Expert Level Java Tasks</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Welcome to the Java Expert Examination. Here you will find advanced Java programming tasks to test your expertise.
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

export default JavaExpertExamination;
