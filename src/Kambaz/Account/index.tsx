import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Profile from "./Profile"; // Import Profile component
import Signup from "./Signup";  // Import Signup component
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen">
        <h2>Account</h2>
        <Signin />
        <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top"> 
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="/Signup" element={<Signup />} />   
      </Routes>
      </td>
        </tr>
      </table>
    </div>
  );
}


