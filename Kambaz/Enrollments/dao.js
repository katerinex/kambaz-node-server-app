// Kambaz/Enrollments/dao.js

import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export async function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findEnrollmentsForUser(userId) {
  return model.find({ user: userId });
}

export async function findEnrollmentsForCourse(courseId) {
  return model.find({ course: courseId });
}