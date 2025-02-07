// src/Kambaz/Courses/Home/index.tsx
import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Modules from "../Modules";
import CourseStatus from "./Status";
import CourseNavigation from "../Navigation";

export default function Home() {
  const { cid } = useParams(); // Get the course ID from the URL

  return (
    <div className="d-flex" id="wd-home">
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>
      <div className="flex-fill me-3">
        <Modules courseId={cid} /> {/* Passing courseId as a prop */}
      </div>
      <div className="d-none d-xl-block">
        <CourseStatus courseId={cid} /> {/* Passing courseId as a prop */}
      </div>
    </div>
  );
}
