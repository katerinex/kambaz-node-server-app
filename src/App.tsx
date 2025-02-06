 // src/App.tsx
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          {/* Main Labs Route */}
          <Route path="/Labs/*" element={<Labs />} />
          
          {/* Kambaz Route */}
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
    </HashRouter>
  );
}


