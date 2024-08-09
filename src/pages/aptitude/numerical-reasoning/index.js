import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const topics = [
  { id: 'problems-on-trains', name: 'Problems on Trains' },
  { id: 'time-and-distance', name: 'Time and Distance' },
  { id: 'percentage', name: 'Percentage' },
  { id: 'profit-and-loss', name: 'Profit and Loss' },
  { id: 'simple-interest', name: 'Simple Interest' },
  { id: 'compound-interest', name: 'Compound Interest' },
  { id: 'averages', name: 'Averages' },
  { id: 'ratio-and-proportion', name: 'Ratio and Proportion' },
  { id: 'pipes-and-cisterns', name: 'Pipes and Cisterns' },
  { id: 'probability', name: 'Probability' },
];

const NumericalReasoningIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Numerical Reasoning</h1>
      <input
        type="text"
        placeholder="Search topics..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <motion.li
            key={topic.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded shadow"
          >
            <Link href={`/aptitude/numerical-reasoning/topics/${topic.id}`} className="text-blue-600 hover:text-blue-800">
              {topic.name}
            </Link>
          </motion.li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/aptitude/numerical-reasoning/test" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Take a Numerical Reasoning Test
        </Link>
      </div>
    </div>
  );
};

export default NumericalReasoningIndex;
