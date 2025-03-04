// src/Kambaz/Account/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NEU2Image from "/Users/katerineosorio/2025/spring/webdev/kambaz-react-web-app/src/assets/NEU2.jpg";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const links = currentUser
    ? [{ name: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { name: "Signin", path: "/Kambaz/Account/Signin" },
        { name: "Signup", path: "/Kambaz/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="p-3">
      <img
        src={NEU2Image}
        alt="Northeastern Logo"
        style={{ width: "150px", marginBottom: "20px" }}
      />
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`nav-link ${pathname === link.path ? "active" : ""}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
