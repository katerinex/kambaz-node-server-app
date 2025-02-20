// src/App.tsx
import { HashRouter, Route, Routes } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Kambaz />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
        <Route path="/Labs/*" element={<Labs />} />
      </Routes>
    </HashRouter>
  );
}

