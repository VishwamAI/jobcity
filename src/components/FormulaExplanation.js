import React, { useState } from 'react';

const FormulaExplanation = ({ formula, explanation }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Formula:</h3>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
        </button>
      </div>
      <div className="mt-2 p-4 bg-gray-100 rounded-md">
        <code className="text-lg font-mono">{formula}</code>
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-md">
          <h4 className="text-md font-semibold mb-2">Explanation:</h4>
          <p className="text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default FormulaExplanation;
