// src/Labs/index.tsx
import React from 'react'; // Import React!
import { Route, Routes, useNavigate } from "react-router-dom";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
  const navigate = useNavigate();
  return (
    <Provider store={store}>
    <div className="p-3">
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<NavigateToLab1 navigate={navigate} />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
    </Provider>
  );
}

// Correctly type the navigate prop.  "any" is usually a bad idea.
interface NavigateToLab1Props {
  navigate: ReturnType<typeof useNavigate>;
}

const NavigateToLab1: React.FC<NavigateToLab1Props> = ({ navigate }) => {
  React.useEffect(() => {
    navigate("Lab1");
  }, [navigate]);
  return null;
};
