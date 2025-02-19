// src/Kambaz/Courses/index.tsx
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table"; // Import the PeopleTable component
import { FaAlignJustify } from "react-icons/fa";
import { Navigate, Route, Routes, useParams } from "react-router-dom";

export default function Courses() {
  const { cid } = useParams(); // Get the course ID

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation courseId={cid} />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            {/* Pass the `cid` prop to Modules component */}
            <Route path="Modules" element={<Modules courseId={cid} />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
