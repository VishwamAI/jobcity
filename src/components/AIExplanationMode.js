import React, { useState } from 'react';

const AIExplanationMode = () => {
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call to LLaMA 3.1 AI model
      const response = await fetch('/api/ai-explanation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Error fetching AI explanation:', error);
      setExplanation('Sorry, there was an error generating the explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Explanation Mode</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">
            Ask a question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your question here"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Get AI Explanation'}
        </button>
      </form>
      {explanation && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Explanation:</h3>
          <p className="text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default AIExplanationMode;