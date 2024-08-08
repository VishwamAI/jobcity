import React, { useState } from 'react';
import axios from 'axios';

interface AIExperiment {
  name: string;
  description: string;
  prompt: string;
}

const AIResearchSpecialist: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState<AIExperiment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const aiExperiments: AIExperiment[] = [
    {
      name: 'Sentiment Analysis',
      description: 'Analyze the sentiment of a given text.',
      prompt: 'Analyze the sentiment of the following text: ',
    },
    {
      name: 'Text Summarization',
      description: 'Generate a concise summary of a longer text.',
      prompt: 'Summarize the following text in 2-3 sentences: ',
    },
    {
      name: 'Code Generation',
      description: 'Generate code based on a natural language description.',
      prompt: 'Write a Python function that ',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleExperimentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = aiExperiments.find(exp => exp.name === e.target.value);
    setSelectedExperiment(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExperiment) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/llama', {
        prompt: `${selectedExperiment.prompt}${userInput}`,
      });
      setAiResponse(response.data.result);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('An error occurred while processing your request.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Research and Development - Specialist Level</h1>

        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Advanced AI Concepts and Experiments</h2>
          <p className="text-gray-600 mb-4">
            At the specialist level, we explore cutting-edge AI techniques and their practical applications. This includes advanced natural language processing, reinforcement learning, and AI ethics considerations.
          </p>
          <p className="text-gray-600 mb-4">
            Engage with our Llama 3.1 AI model through various experiments to understand its capabilities and limitations in different scenarios.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Interactive AI Experiments</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="experiment-select" className="block text-lg font-medium text-gray-700 mb-2">
                Select AI Experiment
              </label>
              <select
                id="experiment-select"
                onChange={handleExperimentChange}
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an experiment</option>
                {aiExperiments.map((exp) => (
                  <option key={exp.name} value={exp.name}>
                    {exp.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedExperiment && (
              <div>
                <p className="text-gray-600 mb-2">{selectedExperiment.description}</p>
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Enter your text here..."
                ></textarea>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              disabled={isLoading || !selectedExperiment}
            >
              {isLoading ? 'Processing...' : 'Run Experiment'}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Response:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AIResearchSpecialist;
