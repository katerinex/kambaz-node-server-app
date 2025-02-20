// src/Kambaz/Courses/Home/Status.tsx

import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";

interface CourseStatusProps {
  courseId?: string;
}

const CourseStatus: React.FC<CourseStatusProps> = () => {  // Removed unused parameter
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>
      {/* First Row - Unpublish / Publish buttons */}
      <div className="d-flex mb-3">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>
      {/* Second Row - Import Existing Content / Import from Commons */}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>
      {/* Additional Buttons */}
      <Button variant="info" size="lg" className="w-100 mt-1 text-start">
        View Course Notifications
      </Button>
      <Button variant="warning" size="lg" className="w-100 mt-1 text-start">
        Manage Course Settings
      </Button>
      <Button variant="danger" size="lg" className="w-100 mt-1 text-start">
        Delete Course
      </Button>
    </div>
  );
};

export default CourseStatus;