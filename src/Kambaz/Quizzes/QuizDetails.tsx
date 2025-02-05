import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ... (Quiz interface - include all the properties)

const QuizDetails: React.FC<{ quizId: number }> = ({ quizId }) => {
  // ... (Data fetching logic as before)

  const renderFacultyDetails = () => (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4"> {/* Use grid for layout */}
        <div>
          <p><strong>Quiz Type:</strong> {quiz?.quizType || 'Graded Quiz'}</p>
          <p><strong>Points:</strong> {quiz?.points || 0}</p>
          <p><strong>Assignment Group:</strong> {quiz?.assignmentGroup || 'Quizzes'}</p>
          <p><strong>Shuffle Answers:</strong> {quiz?.shuffleAnswers ? 'Yes' : 'No'}</p>
          <p><strong>Time Limit:</strong> {quiz?.timeLimit || '20 Minutes'}</p>
          <p><strong>Multiple Attempts:</strong> {quiz?.multipleAttempts ? 'Yes' : 'No'}</p>
          {quiz?.multipleAttempts && (
            <p><strong>How Many Attempts:</strong> {quiz?.howManyAttempts || 1}</p>
          )}
          <p><strong>Show Correct Answers:</strong> {quiz?.showCorrectAnswers || 'Never'}</p> {/* Add default if needed */}
        </div>
        <div>
          <p><strong>Access Code:</strong> {quiz?.accessCode || ''}</p>
          <p><strong>One Question at a Time:</strong> {quiz?.oneQuestionAtATime ? 'Yes' : 'No'}</p>
          <p><strong>Webcam Required:</strong> {quiz?.webcamRequired ? 'Yes' : 'No'}</p>
          <p><strong>Lock Questions After Answering:</strong> {quiz?.lockQuestions ? 'Yes' : 'No'}</p>
          <p><strong>Due Date:</strong> {quiz?.dueDate || ''}</p>
          <p><strong>Available Date:</strong> {quiz?.availableDate || ''}</p>
          <p><strong>Until Date:</strong> {quiz?.untilDate || ''}</p>
        </div>
      </div>
      {/* ... any other faculty-specific details */}
    </div>
  );

  const renderStudentStartButton = () => (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Start Quiz
      </button>
    </div>
  );

  return (
    <div>
      {userRole === 'faculty' ? (
        renderFacultyDetails()
      ) : userRole === 'student' ? (
        renderStudentStartButton()
      ) : (
        <div>Please log in to view quiz details.</div>
      )}
    </div>
  );
};

export default QuizDetails;