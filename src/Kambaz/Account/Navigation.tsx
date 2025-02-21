// src/Kambaz/Account/Navigation.tsx
import { Link } from "react-router-dom";
import NEU2Image from "/Users/katerineosorio/2025/spring/webdev/kambaz-react-web-app/src/assets/NEU2.jpg"; // Replace with your actual path

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="p-3"> 
      <img src={NEU2Image} alt="Northeastern Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <Link to={`/Kambaz/Account/Signin`} className="nav-link"> Signin </Link> <br />
      <Link to={`/Kambaz/Account/Signup`} className="nav-link"> Signup </Link> <br />
      <Link to={`/Kambaz/Account/Profile`} className="nav-link"> Profile </Link> <br />
    </div>
  );
}
