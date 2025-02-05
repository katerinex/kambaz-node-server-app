import React, { useState, useEffect } from 'react';

interface Quiz {
  title: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  viewResponses: string;
  showCorrectAnswers: string;
  oneQuestionAtATime: boolean;
  requireRespondus: boolean; 
  requireResults: boolean;   
  webcamRequired: boolean;
  lockQuestions: boolean;
  dueDate: string;
  for: string; 
  availableDate: string;
  untilDate: string;
}

const QuizDetails: React.FC<{ quizId: number }> = ({ quizId }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Quiz = await response.json();
        setQuiz(data);
      } catch (err: any) { // Type the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <button className="bg-gray-200 px-4 py-2 rounded mr-2">Preview</button>
            <button className="bg-gray-200 px-4 py-2 rounded">Edit</button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>

        <div className="mb-6">
          <div className="space-y-2">
            <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
            <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}</p> {/* Display as Yes/No */}
            <p><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</p> {/* Add "Minutes" */}
            <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? 'Yes' : 'No'}</p>
            <p><strong>View Responses:</strong> {quiz.viewResponses}</p>
            <p><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</p>
            <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
            <p><strong>Require Respondus LockDown Browser:</strong> {quiz.requireRespondus ? 'Yes' : 'No'}</p>
            <p><strong>Required to View Quiz Results:</strong> {quiz.requireResults ? 'Yes' : 'No'}</p>
            <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}</p>
            <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestions ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-semibold border border-gray-300">Due</th>
              <th className="py-2 px-4 font-semibold border border-gray-300">For</th>
              <th className="py-2 px-4 font-semibold border border-gray-300">Available from</th>
              <th className="py-2 px-4 font-semibold border border-gray-300">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">{quiz.dueDate}</td>
              <td className="py-2 px-4 border border-gray-300">{quiz.for}</td>
              <td className="py-2 px-4 border border-gray-300">{quiz.availableDate}</td>
              <td className="py-2 px-4 border border-gray-300">{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizDetails;