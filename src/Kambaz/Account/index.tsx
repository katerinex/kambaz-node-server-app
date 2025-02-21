// src/Kambaz/Account/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation"; // Import AccountNavigation

export default function Account() {
  return (
    <div id="wd-account-screen" className="d-flex vh-100">
      <div className="d-none d-md-block" style={{ width: '200px', backgroundColor: '#000' }}>
        <AccountNavigation />
      </div>
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="Signin" />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}