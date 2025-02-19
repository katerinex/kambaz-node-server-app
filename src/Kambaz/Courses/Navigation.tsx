//src/Kambaz/Courses/Navigation.tsx

import { Link, useParams } from "react-router-dom"; // Import useParams
//import '../styles.css';


// Define the props interface
interface CourseNavigationProps {
  courseId: string | undefined;
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({ courseId }) => {
  return (
    <div id="wd-courses-navigation" className="wd">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Home`}
            id="wd-course-home-link"
            className="d-block text-dark text-decoration-none px-4 py-3 rounded-0"
          >
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Modules`}
            id="wd-course-modules-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Modules
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Piazza`}
            id="wd-course-piazza-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Piazza
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Zoom`}
            id="wd-course-zoom-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Zoom
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Assignments`}
            id="wd-course-assignments-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Assignments
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Quizzes`}
            id="wd-course-quizzes-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Quizzes
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/Grades`}
            id="wd-course-grades-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            Grades
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={`/Kambaz/Courses/${courseId}/People`}
            id="wd-course-people-link"
            className="d-block text-danger text-decoration-none px-4 py-3 rounded-0"
          >
            People
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CourseNavigation;
