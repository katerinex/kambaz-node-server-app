// Kambaz/Courses/dao.js

import model from "./model.js";

export const findAllCourses = async () => {
  return model.find();
};

export const findCourseById = async (courseId) => {
  return model.findById(courseId);
};

export const createCourse = async (course) => {
  delete course._id;
  return model.create(course);
};

export const deleteCourse = async (courseId) => {
  return model.deleteOne({ _id: courseId });
};

export const updateCourse = async (courseId, courseUpdates) => {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
};

export const findCoursesForEnrolledUser = async (userId) => {
  return model.find({ enrolledUsers: userId });
};