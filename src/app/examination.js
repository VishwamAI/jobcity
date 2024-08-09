import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const examSections = [
  { id: 'aptitude', name: 'Aptitude Reasoning' },
  { id: 'coding', name: 'Coding' },
  { id: 'ai-research', name: 'AI Research' },
  { id: 'ai-security', name: 'AI Security' },
];

const difficultyLevels = [
  { id: 'basic', name: 'Basic' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'expert', name: 'Expert' },
];

export default function Examination() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const mockQuestions = [
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswer: 'Paris' },
    // Add more mock questions as needed
  ];

  const startExam = () => {
    if (selectedSection && selectedDifficulty) {
      setExamStarted(true);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setFeedback(null);
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endExam();
    }
  };

  const endExam = () => {
    const score = userAnswers.reduce((acc, answer, index) => {
      return answer === mockQuestions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setFeedback(`You scored ${score} out of ${mockQuestions.length}`);
    setExamStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Examination - Job-City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Examination</h1>

        {!examStarted ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Create an Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Select Section</h3>
                {examSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded mb-2 ${
                      selectedSection === section.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Select Difficulty</h3>
                {difficultyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedDifficulty(level.id)}
                    className={`w-full text-left px-4 py-2 rounded mb-2 ${
                      selectedDifficulty === level.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={startExam}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!selectedSection || !selectedDifficulty}
            >
              Start Exam
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
            <p className="text-lg mb-4">{mockQuestions[currentQuestion].question}</p>
            <div className="space-y-2">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white shadow rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Exam Results</h2>
            <p className="text-lg">{feedback}</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
