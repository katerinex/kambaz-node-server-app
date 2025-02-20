// src/Labs/index.tsx
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";

export default function Labs() {
  const navigate = useNavigate(); // Get the navigate function

  return (
    <div className="p-3">
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<NavigateToLab1 navigate={navigate} />} /> {/* Use a custom component */}
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
  );
}

// Create a component to handle the navigation
const NavigateToLab1 = ({ navigate }: { navigate: any }) => {
  React.useEffect(() => {
    navigate("Lab1");
  }, [navigate]);
  return null; // Or you could return a loading indicator, etc.
};

