//src/Kambaz/Courses/Navigation.tsx
import { Link } from "react-router-dom";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd">
      {/* ListGroup for the course navigation links */}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Home"
            id="wd-course-home-link"
            className="d-block text-dark text-decoration-none px-4 py-3 rounded-0"
          >
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Modules"
            id="wd-course-modules-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Modules
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Piazza"
            id="wd-course-piazza-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Piazza
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Zoom"
            id="wd-course-zoom-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Zoom
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Assignments"
            id="wd-course-assignments-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Assignments
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Quizzes"
            id="wd-course-quizzes-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Quizzes
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/Courses/1234/Grades"
            id="wd-course-grades-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Grades
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Kambaz/People"
            id="wd-course-people-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            People
          </Link>
        </li>
      </ul>
    </div>
  );
}

