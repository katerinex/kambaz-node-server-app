// src/App.tsx
import { HashRouter, Route, Routes } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import courses from './courses.json';
import { Course } from './types';

export default function App() {
  return (
    <Dashboard courses={courses as Course[]} />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Kambaz />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
        <Route path="/Labs/*" element={<Labs />} />
      </Routes>
    </HashRouter>
  );
}

