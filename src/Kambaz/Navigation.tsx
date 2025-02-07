//src/Kambaz/Navigation.tsx
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import './styles.css';

export default function KambazNavigation() {
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 110 }}  
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
    >
      {/* NEU Logo */}
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0"
      >
        <img src="/images/NEU-logo.svg" width="75px" alt="NEU Logo" />
      </a>

      {/* Account */}
      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className="list-group-item text-white bg-black border-0 py-3"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>

      {/* Dashboard (Active Link) */}
      <Link
        to="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className="list-group-item bg-white text-danger border-0 py-3 active-link"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </Link>

      {/* Courses */}
      <Link
        to="/Kambaz/Courses"
        id="wd-course-link"
        className="list-group-item text-white bg-black border-0 py-3"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>

      {/* Calendar */}
      <Link
        to="/Kambaz/Calendar"
        id="wd-calendar-link"
        className="list-group-item text-white bg-black border-0 py-3"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </Link>

      {/* Inbox */}
      <Link
        to="/Kambaz/Inbox"
        id="wd-inbox-link"
        className="list-group-item text-white bg-black border-0 py-3"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </Link>

      {/* Labs */}
      <Link
  to="/Labs"  // Updated to match the path in App.tsx
  id="wd-labs-link"
  className="list-group-item text-white bg-black border-0 py-3"
>
  <LiaCogSolid className="fs-1 text-danger" />
  <br />
  Labs
</Link>
    </div>
  );
}
