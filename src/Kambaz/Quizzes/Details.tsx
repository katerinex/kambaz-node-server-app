import { useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface QuizDetailsProps {
  isFaculty: boolean;
}

export default function QuizDetails({ isFaculty }: QuizDetailsProps) {
  const [quiz] = useState({
    quizType: "Graded Quiz",
    points: 29,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: "No",
    timeLimit: "30 Minutes",
    multipleAttempts: "No",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    requireRespondusLockDownBrowser: "No",
    requiredToViewQuizResults: "No",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: "Sep 21 at 1pm",
    availableDate: "Sep 21 at 11:40am",
    untilDate: "Sep 21 at 1pm",
  });

  return (
    <Card className="p-6 max-w-2xl mx-auto border border-gray-300 shadow-sm">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Q1 - HTML</h2>
        <div className="space-y-2">
          <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
          <p><strong>Points:</strong> {quiz.points}</p>
          <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
          <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers}</p>
          <p><strong>Time Limit:</strong> {quiz.timeLimit}</p>
          <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts}</p>
          <p><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</p>
          <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime}</p>
          <p><strong>Require Respondus LockDown Browser:</strong> {quiz.requireRespondusLockDownBrowser}</p>
          <p><strong>Required to View Quiz Results:</strong> {quiz.requiredToViewQuizResults}</p>
          <p><strong>Webcam Required:</strong> {quiz.webcamRequired}</p>
          <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering}</p>
        </div>
        <table className="w-full mt-4 border-t border-gray-300 text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 font-semibold">Due</th>
              <th className="font-semibold">For</th>
              <th className="font-semibold">Available from</th>
              <th className="font-semibold">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">{quiz.dueDate}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
        {isFaculty ? (
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" className="border border-gray-400 px-4 py-2">Preview</Button>
            <Button variant="outline" className="border border-gray-400 px-4 py-2">Edit</Button>
          </div>
        ) : (
          <Button className="mt-4 w-full bg-blue-500 text-white py-2">Start Quiz</Button>
        )}
      </CardContent>
    </Card>
  );
}
