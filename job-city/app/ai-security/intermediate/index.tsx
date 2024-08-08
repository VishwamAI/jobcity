import React, { useState } from 'react';
import axios from 'axios';

interface SecurityConcept {
  name: string;
  description: string;
}

const IntermediateAISecurity: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<SecurityConcept | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const securityConcepts: SecurityConcept[] = [
    { name: 'Model Robustness', description: 'The ability of an AI model to maintain performance under various conditions or inputs.' },
    { name: 'Adversarial Attacks', description: 'Attempts to fool AI models by providing deceptive input.' },
    { name: 'Ethical AI Development', description: 'Ensuring AI systems are developed and used in ways that respect human values and rights.' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleConceptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = securityConcepts.find(concept => concept.name === e.target.value);
    setSelectedConcept(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConcept) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/llama', {
        prompt: `Explain how ${selectedConcept.name} relates to the following scenario in AI security: ${userInput}`,
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Intermediate AI Security Concepts
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Explore advanced AI security concepts and their applications in real-world scenarios.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="concept-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select an AI Security Concept
              </label>
              <select
                id="concept-select"
                onChange={handleConceptChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Choose a concept</option>
                {securityConcepts.map((concept) => (
                  <option key={concept.name} value={concept.name}>
                    {concept.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedConcept && (
              <div>
                <p className="text-sm text-gray-600 mb-2">{selectedConcept.description}</p>
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                  placeholder="Describe a scenario or ask a question related to this concept..."
                ></textarea>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={isLoading || !selectedConcept}
            >
              {isLoading ? 'Processing...' : 'Analyze with AI'}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-6 bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis:</h2>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntermediateAISecurity;
