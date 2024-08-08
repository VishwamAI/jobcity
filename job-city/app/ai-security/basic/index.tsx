import React, { useState } from 'react';
import axios from 'axios';

const BasicAISecurity: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/llama', {
        prompt: `Explain the following AI security concept in simple terms: ${userInput}`,
      });
      setAiResponse(response.data.result);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('An error occurred while fetching the AI response.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          AI Security Basics
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Welcome to the AI Security Basics section. Here, you'll learn about fundamental concepts in AI security and how to protect AI systems from potential threats.
          </p>
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="security-concept" className="block text-sm font-medium text-gray-700 mb-2">
              Enter an AI security concept you'd like to learn about:
            </label>
            <input
              type="text"
              id="security-concept"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., data poisoning, model inversion, adversarial attacks"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Explain Concept'}
            </button>
          </form>
          {aiResponse && (
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Explanation:</h2>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
        </div>
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key AI Security Concepts</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Data Privacy and Protection</li>
            <li>Model Robustness</li>
            <li>Adversarial Attacks</li>
            <li>Ethical AI Development</li>
            <li>Secure Model Deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BasicAISecurity;
