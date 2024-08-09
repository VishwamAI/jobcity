import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TwoDExplanation = ({ concept, data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && data) {
      // Here we would typically use a library like D3.js to create
      // more complex visualizations. For this example, we'll use
      // basic SVG elements.
      const svg = svgRef.current;
      svg.innerHTML = ''; // Clear previous content

      // Example: Create a simple bar chart
      const maxValue = Math.max(...data);
      const barWidth = 40;
      const barGap = 10;
      const chartHeight = 200;

      data.forEach((value, index) => {
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', index * (barWidth + barGap));
        bar.setAttribute('y', chartHeight - (value / maxValue) * chartHeight);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', (value / maxValue) * chartHeight);
        bar.setAttribute('fill', '#4CAF50');
        svg.appendChild(bar);
      });
    }
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{concept}</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="250"
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid meet"
        />
      </motion.div>
      <p className="mt-4 text-gray-600">
        This visualization helps explain the concept of {concept} using a simple bar chart.
        Each bar represents a data point, and the height of the bar corresponds to its value.
      </p>
    </div>
  );
};

export default TwoDExplanation;