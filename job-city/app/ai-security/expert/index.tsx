import React, { useState } from 'react';
import axios from 'axios';

interface SecurityScenario {
  name: string;
  description: string;
  prompt: string;
}

const ExpertAISecurity: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<SecurityScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const securityScenarios: SecurityScenario[] = [
    {
      name: 'Advanced Adversarial Attacks',
      description: 'Analyze and defend against sophisticated adversarial attacks on AI models.',
      prompt: 'Propose a defense strategy against the following advanced adversarial attack scenario: ',
    },
    {
      name: 'AI Model Backdoors',
      description: 'Detect and mitigate backdoors in AI models that could lead to security vulnerabilities.',
      prompt: 'Describe a method to identify and neutralize the following potential AI model backdoor: ',
    },
    {
      name: 'Federated Learning Security',
      description: 'Ensure security and privacy in federated learning environments.',
      prompt: 'Suggest security measures for the following federated learning scenario to protect against data leakage and model poisoning: ',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = securityScenarios.find(scenario => scenario.name === e.target.value);
    setSelectedScenario(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScenario) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/llama', {
        prompt: `${selectedScenario.prompt}${userInput}`,
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
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Expert AI Security Analysis
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-gray-700 mb-6">
            Engage with advanced AI security scenarios and develop expert-level strategies using our Llama 3.1 AI model.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="scenario-select" className="block text-lg font-medium text-gray-700 mb-2">
                Select an Advanced AI Security Scenario
              </label>
              <select
                id="scenario-select"
                onChange={handleScenarioChange}
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a scenario</option>
                {securityScenarios.map((scenario) => (
                  <option key={scenario.name} value={scenario.name}>
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedScenario && (
              <div>
                <p className="text-gray-600 mb-2">{selectedScenario.description}</p>
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Describe the specific scenario or challenge..."
                ></textarea>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              disabled={isLoading || !selectedScenario}
            >
              {isLoading ? 'Analyzing...' : 'Generate Expert Analysis'}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Expert Analysis:</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertAISecurity;
