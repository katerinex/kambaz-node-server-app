// src/Labs/index.tsx
import { Route, Routes } from "react-router-dom";
import Lab1 from "./Lab1";  
import Lab2 from "./Lab2";  
import Lab3 from "./Lab3";  
import TOC from "./TOC";

export default function Labs() {
  return (
    <div>
      <h2>Katerine Osorio-Maldonado</h2>
      <h1>Labs</h1>

      {/* Render Table of Contents (TOC) */}
      <TOC />

      {/* Render the appropriate lab based on URL */}
      <Routes>
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
