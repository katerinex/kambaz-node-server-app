// src/Kambaz/Dashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import courses from "./Database/courses.json";
import { Button } from 'react-bootstrap';
import { toggleEnrollment } from "./Courses/Enrollments/reducer";

interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleEnroll = (courseId: string) => {
    dispatch(toggleEnrollment({ user: currentUser.id, course: courseId }));
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: Enrollment) => enrollment.user === currentUser?.id && enrollment.course === courseId
    );
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {currentUser?.role === "STUDENT" && (
        <Button onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "My Courses" : "Enrollments"}
        </Button>
      )}
      <h2 id="wd-dashboard-published">Published Courses</h2>
      <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  <Link to={`/Kambaz/Courses/${course._id}`} className="btn btn-primary">
                    Go
                  </Link>
                  {currentUser?.role === "STUDENT" && (
                    <Button
                      variant={isEnrolled(course._id) ? "danger" : "success"}
                      onClick={() => toggleEnroll(course._id)}
                    >
                      {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}