// src/Kambaz/Dashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import courses from "./Database/courses.json";
import enrollments from "./Database/enrollments.json";
import { Button } from 'react-bootstrap';

interface DashboardProps {
    courses?: any[];
    course?: any;
    setCourse?: React.Dispatch<any>;
    addNewCourse?: () => void;
    deleteCourse?: (courseId: any) => void;
    updateCourse?: () => void;
}

export default function Dashboard({courses, course, setCourse, addNewCourse, deleteCourse, updateCourse}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses</h2>
      <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses?.filter((course) => // Optional chaining here
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser?.id &&
                  enrollment.course === course._id
              )
            )
            .map((course) => (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{course.name}</h5>
                    <p className="card-text">{course.description}</p>
                    <Link to={`/Kambaz/Courses/${course._id}`} className="btn btn-primary">
                      Go
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}