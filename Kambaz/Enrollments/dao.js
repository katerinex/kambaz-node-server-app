// Kambaz/Enrollments/dao.js
import model from "./model.js";
// Remove mongoose import since we're not using ObjectIds

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {
  // Validate parameters before proceeding
  if (!user || !course || user === 'undefined' || course === 'undefined') {
    throw new Error(`Invalid parameters: user=${user}, course=${course}`);
  }
  
  try {
    // Create a compound ID as specified in your assignment
    const newEnrollment = { 
      user, 
      course, 
      _id: `${user}-${course}` 
    };
    
    console.log(`Creating new enrollment: user=${user}, course=${course}`);
    return await model.create(newEnrollment);
  } catch (error) {
    console.error("Error in enrollUserInCourse:", error);
    throw error;
  }
}

export async function unenrollUserFromCourse(user, course) {
  // Validate parameters
  if (!user || !course) {
    throw new Error("Both user and course are required for unenrollment");
  }
  
  return await model.deleteOne({ user, course });
}

export async function findEnrollmentsForUser(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  
  return await model.find({ user: userId });
}

export async function findEnrollmentsForCourse(courseId) {
  if (!courseId) {
    throw new Error("Course ID is required");
  }
  
  return await model.find({ course: courseId });
}