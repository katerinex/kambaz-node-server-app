//src/Kambaz/Courses/Navigation.tsx
import { Link, useParams } from "react-router-dom"; // Import useParams

export default function CourseNavigation() {
  const { cid } = useParams(); // Get the course ID

  return (
    <div id="wd-courses-navigation" className="wd">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Home`} // Use template literal and cid
            id="wd-course-home-link"
            className="d-block text-dark text-decoration-none px-4 py-3 rounded-0"
          >
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Modules`} // Use template literal and cid
            id="wd-course-modules-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Modules
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Piazza`} // Use template literal and cid
            id="wd-course-piazza-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Piazza
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Zoom`} // Use template literal and cid
            id="wd-course-zoom-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Zoom
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`} // Use template literal and cid
            id="wd-course-assignments-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Assignments
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes`} // Use template literal and cid
            id="wd-course-quizzes-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Quizzes
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/Grades`} // Use template literal and cid
            id="wd-course-grades-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Grades
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${cid}/People`} // Use template literal and cid
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

