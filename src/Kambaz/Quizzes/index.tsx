import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuizDetails from '../components/QuizDetails'; // Import the QuizDetails component

const QuizzesPage: React.FC = () => {
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  // Sample quiz data (replace with API call later)
  const quizzes = [
    { id: 1, title: 'Quiz 1' },
    { id: 2, title: 'Quiz 2' },
    { id: 3, title: 'Quiz 3' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 bg-white p-8">
        <Header title="Quizzes" />
        <div className="mb-4">
          {/* List of quizzes */}
          <ul>
            {quizzes.map(quiz => (
              <li key={quiz.id} className="py-2 cursor-pointer hover:underline" onClick={() => setSelectedQuizId(quiz.id)}>
                {quiz.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Conditionally render QuizDetails */}
        {selectedQuizId && <QuizDetails quizId={selectedQuizId} />}
      </div>
    </div>
  );
};

export default QuizzesPage;