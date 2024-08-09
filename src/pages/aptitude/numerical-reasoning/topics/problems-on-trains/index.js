import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: "A train travels 180 km in 3 hours. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: "60 km/h"
  },
  {
    id: 2,
    text: "If a train is traveling at 120 km/h, how far will it travel in 2.5 hours?",
    options: ["250 km", "275 km", "300 km", "325 km"],
    correctAnswer: "300 km"
  },
  {
    id: 3,
    text: "Two trains are traveling in opposite directions at 60 km/h and 80 km/h. If they start 420 km apart, how long will it take for them to meet?",
    options: ["2 hours", "3 hours", "3.5 hours", "4 hours"],
    correctAnswer: "3 hours"
  },
  {
    id: 4,
    text: "A train 250 meters long passes a pole in 10 seconds. What is the speed of the train in km/h?",
    options: ["54 km/h", "72 km/h", "90 km/h", "108 km/h"],
    correctAnswer: "90 km/h"
  },
  {
    id: 5,
    text: "A train travels at an average speed of 60 km/h for 2 hours and then at 90 km/h for the next 3 hours. What is the total distance traveled?",
    options: ["330 km", "390 km", "420 km", "450 km"],
    correctAnswer: "390 km"
  },
  {
    id: 6,
    text: "A train 150 meters long is running at a speed of 68 km/hr. In how many seconds will it pass a platform 200 meters long?",
    options: ["15 seconds", "18 seconds", "20 seconds", "22 seconds"],
    correctAnswer: "18 seconds"
  }
];

const ProblemsOnTrains = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Problems on Trains</h1>
      {showScore ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          You scored {score} out of {questions.length}
        </motion.div>
      ) : (
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
      )}
    </div>
  );
};

export default ProblemsOnTrains;
