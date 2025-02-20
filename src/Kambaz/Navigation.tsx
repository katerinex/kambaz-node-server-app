// src/Kambaz/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import './styles.css';

export default function KambazNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path) ? "active" : "";
  };

  return (
    <div
      id="wd-kambaz-navigation"
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0"
        rel="noopener noreferrer"
      >
        <img src="/images/NEU-logo.svg" width="75" alt="NEU Logo" />
      </a>

      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Account')}`}
      >
        <FaRegCircleUser className="fs-1" />
        <br />
        Account
      </Link>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Dashboard')}`}
      >
        <AiOutlineDashboard className="fs-1" />
        <br />
        Dashboard
      </Link>

      <Link
        to="/Kambaz/Courses"
        id="wd-course-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Courses')}`}
      >
        <LiaBookSolid className="fs-1" />
        <br />
        Courses
      </Link>

      <Link
        to="/Kambaz/Calendar"
        id="wd-calendar-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Calendar')}`}
      >
        <IoCalendarOutline className="fs-1" />
        <br />
        Calendar
      </Link>

      <Link
        to="/Kambaz/Inbox"
        id="wd-inbox-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Inbox')}`}
      >
        <FaInbox className="fs-1" />
        <br />
        Inbox
      </Link>

      <Link
        to="/Labs"
        id="wd-labs-link"
        className={`list-group-item text-white bg-black border-0 py-3 ${isActive('/Labs')}`}
      >
        <LiaCogSolid className="fs-1" />
        <br />
        Labs
      </Link>
    </div>
  );
}
