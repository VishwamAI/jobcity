import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    text: "A train travels 240 km in 4 hours. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: "60 km/h"
  },
  {
    id: 2,
    text: "If a car is traveling at 90 km/h, how far will it travel in 2 hours?",
    options: ["150 km", "180 km", "200 km", "220 km"],
    correctAnswer: "180 km"
  },
  // Add more questions here...
];

const NumericalReasoningTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowScore(true);
    }
  }, [timeLeft, showScore]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Numerical Reasoning Test</h1>
      {showScore ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          You scored {score} out of {questions.length}
          <Link href="/aptitude/numerical-reasoning">
            <a className="block mt-4 text-blue-500 hover:text-blue-700">Back to Topics</a>
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="mb-4 text-lg">Time Left: {formatTime(timeLeft)}</div>
          <motion.div
            key={currentQuestion}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div className="mb-4">
              <span className="text-lg font-semibold">Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="text-xl mb-4">{questions[currentQuestion].text}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default NumericalReasoningTest;
