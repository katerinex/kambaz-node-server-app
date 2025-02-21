// src/Kambaz/Courses/Quizzes/index.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import QuizList from './List';
import QuizDetails from './Details';
import QuizEditor from './Editor';

export default function Quizzes() {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="/new" element={<QuizEditor />} />
      <Route path="/:qid" element={<QuizDetails />} />
      <Route path="/:qid/edit" element={<QuizEditor />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}