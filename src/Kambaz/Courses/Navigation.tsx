// src/Kambaz/Courses/Navigation.tsx

import { Link } from "react-router-dom";
import { FaHome, FaBook, FaCalendarDay, FaTachometerAlt, FaUsers, FaRocket } from "react-icons/fa";

interface CourseNavigationProps {
  courseId: string | undefined;
}

export default function CourseNavigation({ courseId }: CourseNavigationProps) { // Destructure and type
  return (
    <div className="list-group" style={{ width: "200px" }}>
      <Link
        to={`/Kambaz/Courses/${courseId}/Home`}
        className="list-group-item list-group-item-action"
      >
        <FaHome className="me-2" /> Home
      </Link>
      <Link
        to={`/Kambaz/Courses/${courseId}/Modules`}
        className="list-group-item list-group-item-action"
      >
        <FaBook className="me-2" /> Modules
      </Link>
      <Link
        to={`/Kambaz/Courses/${courseId}/Assignments`}
        className="list-group-item list-group-item-action"
      >
        <FaCalendarDay className="me-2" /> Assignments
      </Link>
      <Link
        to={`/Kambaz/Courses/${courseId}/Grades`}
        className="list-group-item list-group-item-action"
      >
        <FaTachometerAlt className="me-2" /> Grades
      </Link>
      <Link
        to={`/Kambaz/Courses/${courseId}/People`}
        className="list-group-item list-group-item-action"
      >
        <FaUsers className="me-2" /> People
      </Link>
      <Link
        to={`/Kambaz/Courses/${courseId}/Settings`}
        className="list-group-item list-group-item-action"
      >
        <FaRocket className="me-2" /> Settings
      </Link>
    </div>
  );
}