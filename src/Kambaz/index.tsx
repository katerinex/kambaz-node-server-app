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
  const [courses, setCourses] = useState<Course[]>([]); // Initialize as an array
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    console.log("deleteCourse status:", status);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async (updatedCourse: Course) => {
    setCourses(
      courses.map((c: Course) => {
        if (c._id === updatedCourse._id) {
          return updatedCourse;
        } else {
          return c;
        }
      })
    );
    await courseClient.updateCourse(updatedCourse);
  };

  const findCoursesForUser = async () => {
    try {
      const fetchedCourses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
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
  };

  const fetchCourses = async () => {
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
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
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
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