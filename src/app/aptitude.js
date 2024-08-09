import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const formulas = [
  { id: 1, name: 'Percentage', formula: '(Part / Whole) * 100', explanation: 'Divide the part by the whole and multiply by 100 to get the percentage.' },
  { id: 2, name: 'Profit', formula: 'Selling Price - Cost Price', explanation: 'Subtract the cost price from the selling price to calculate profit.' },
  { id: 3, name: 'Speed', formula: 'Distance / Time', explanation: 'Divide the distance traveled by the time taken to calculate speed.' },
];

export default function AptitudeReasoning() {
  const [selectedFormula, setSelectedFormula] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Aptitude Reasoning - Job-City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Aptitude Reasoning</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Formulas</h2>
            <ul className="space-y-2">
              {formulas.map((formula) => (
                <li key={formula.id}>
                  <button
                    onClick={() => setSelectedFormula(formula)}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {formula.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Explanation</h2>
            {selectedFormula ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-2">{selectedFormula.name}</h3>
                <p className="text-gray-600 mb-4">{selectedFormula.formula}</p>
                <p>{selectedFormula.explanation}</p>
              </motion.div>
            ) : (
              <p className="text-gray-500">Select a formula to see its explanation.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
