import React, { useState } from 'react';
import axios from 'axios';

interface AIModel {
  name: string;
  description: string;
}

const AIResearchIntermediate: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>({ name: 'Llama 3.1', description: 'Large Language Model' });
  const [isLoading, setIsLoading] = useState(false);

  const aiModels: AIModel[] = [
    { name: 'Llama 3.1', description: 'Large Language Model' },
    { name: 'GPT-4', description: 'Advanced Language Model' },
    { name: 'DALL-E', description: 'Image Generation Model' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = aiModels.find(model => model.name === e.target.value);
    if (selected) {
      setSelectedModel(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with actual API endpoint for the selected AI model
      const response = await axios.post('/api/ai', { prompt: userInput, model: selectedModel.name });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Research and Development - Intermediate Level</h1>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Advanced AI Concepts</h2>
          <p className="text-gray-600 mb-4">
            At the intermediate level, we delve deeper into AI architectures, exploring concepts such as neural networks, deep learning, and natural language processing. These advanced techniques enable AI systems to perform complex tasks like image recognition, language translation, and even creative content generation.
          </p>
          <p className="text-gray-600 mb-4">
            Understanding the ethical implications and potential biases in AI systems becomes crucial at this stage. As AI technologies advance, it's important to consider their impact on society and ensure responsible development and deployment.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive AI Model Comparison</h2>
          <p className="text-gray-600 mb-4">
            Explore different AI models and compare their responses. Select a model, enter a prompt, and see how each AI system interprets and responds to your input.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select AI Model
              </label>
              <select
                id="model-select"
                value={selectedModel.name}
                onChange={handleModelChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                {aiModels.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name} - {model.description}
                  </option>
                ))}
              </select>
            </div>
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
              {isLoading ? 'Processing...' : `Get ${selectedModel.name} Response`}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedModel.name} Response:</h3>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AIResearchIntermediate;
