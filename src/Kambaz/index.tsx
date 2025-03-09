// src/Kambaz/index.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Calendar from "./Calendar";
import Inbox from "./Inbox";
import "./styles.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  enrolled?: boolean;
}

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const findCoursesForUser = async () => {
    if (!currentUser || !currentUser._id) {
      console.error("Current user or user ID is missing.");
      return;
    }
    try {
      const fetchedCourses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser || !currentUser._id) {
      console.error("Current user or user ID is missing.");
      return;
    }
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      );
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const fetchCourses = async () => {
    if (!currentUser || !currentUser._id) {
      console.error("Current user or user ID is missing.");
      return;
    }
    try {
      const allCourses = await courseClient.findAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const fetchedCourses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser._id) {
      if (enrolling) {
        fetchCourses();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" style={{ display: "flex" }}>
          <KambazNavigation />
          <div className="wd-main-content-offset p-3" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      enrolling={enrolling}
                      setEnrolling={setEnrolling}
                      updateEnrollment={updateEnrollment}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Dashboard/Edit"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      enrolling={enrolling}
                      setEnrolling={setEnrolling}
                      updateEnrollment={updateEnrollment}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Courses/:cid/*"
                element={
                  <ProtectedRoute>
                    <Courses courses={courses} />
                  </ProtectedRoute>
                }
              />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Inbox" element={<Inbox />} />
            </Routes>
          </div>
        </div>
      </Session>
    </Provider>
  );
}