import React, { useState } from 'react';
import axios from 'axios';

const AIResearchBasic: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with actual API endpoint for Llama 3.1 AI
      const response = await axios.post('/api/llama', { prompt: userInput });
      setAiResponse(response.data.result);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('An error occurred while processing your request.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Research and Development - Basic Level</h1>
        
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to AI Concepts</h2>
          <p className="text-gray-600 mb-4">
            Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines that can perform tasks that typically require human intelligence. These tasks include learning, problem-solving, perception, and language understanding.
          </p>
          <p className="text-gray-600 mb-4">
            At its core, AI systems use algorithms and statistical models to analyze data, recognize patterns, and make decisions. Machine Learning, a subset of AI, focuses on the development of algorithms that can learn from and make predictions or decisions based on data.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive AI Demo</h2>
          <p className="text-gray-600 mb-4">
            Experience AI in action! Type a question or prompt below, and our Llama 3.1 AI model will generate a response.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={userInput}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Enter your question or prompt here..."
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Get AI Response'}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Response:</h3>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AIResearchBasic;
