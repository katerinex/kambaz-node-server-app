// src/Kambaz/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Calendar from "./Calendar"; // Create this component
import Inbox from "./Inbox"; // Create this component
import "./styles.css";

export default function Kambaz() {
  return (
    <div id="wd-kambaz" style={{ display: "flex" }}>
      <KambazNavigation />
      <div className="wd-main-content-offset p-3" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Inbox" element={<Inbox />} />
        </Routes>
      </div>
    </div>
  );
}

  


  