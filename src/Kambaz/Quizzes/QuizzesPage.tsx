import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from your API here and set the state
    // Example:
    fetch('/api/quizzes')
      .then(res => res.json())
      .then(data => setQuizzes(data));
  }, []);

  return (
    <div>
      <h2>Quizzes</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={`/Kambaz/Courses/1234/Quizzes/${quiz.id}`}>
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizzesPage;