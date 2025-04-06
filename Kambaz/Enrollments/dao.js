// Kambaz/Enrollments/dao.js
import model from "./model.js";
import mongoose from "mongoose";

export async function findCoursesForUser(userId) {
  if (!userId) {
    console.error("findCoursesForUser called with no userId");
    return [];
  }
  
  console.log(`Finding courses for user: ${userId}`);
  
  try {
    // First, find all enrollments for this user
    const enrollments = await model.find({ user: userId });
    console.log(`Found ${enrollments.length} enrollments for user ${userId}`);
    
    if (enrollments.length === 0) {
      return [];
    }
    
    // Extract course IDs from enrollments
    const courseIds = enrollments.map(enrollment => enrollment.course);
    console.log(`Course IDs: ${courseIds.join(', ')}`);
    
    // Fetch the actual course objects from your course model
    const courseModel = mongoose.model("CourseModel");
    
    try {
      const courses = await courseModel.find({ _id: { $in: courseIds } });
      console.log(`Found ${courses.length} course objects`);
      
      // Mark these courses as enrolled
      const coursesWithEnrollment = courses.map(course => ({
        ...course.toObject(),
        enrolled: true
      }));
      
      return coursesWithEnrollment;
    } catch (error) {
      console.error("Error finding courses by IDs:", error);
      
      // Fallback: Try to populate directly
      const populatedEnrollments = await model.find({ user: userId }).populate("course");
      console.log(`Fallback: Found ${populatedEnrollments.length} populated enrollments`);
      
      // Filter out any null courses
      const validEnrollments = populatedEnrollments.filter(enrollment => enrollment.course);
      
      // Extract and mark as enrolled
      return validEnrollments.map(enrollment => ({
        ...enrollment.course.toObject(),
        enrolled: true
      }));
    }
  } catch (error) {
    console.error("Error in findCoursesForUser:", error);
    return [];
  }
}

export async function findUsersForCourse(courseId) {
  if (!courseId) {
    console.error("findUsersForCourse called with no courseId");
    return [];
  }
  
  try {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.filter(enrollment => enrollment.user).map(enrollment => enrollment.user);
  } catch (error) {
    console.error("Error in findUsersForCourse:", error);
    return [];
  }
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
      _id: `${user}-${course}`,
      enrollmentDate: new Date()
    };
    
    console.log(`Creating new enrollment: user=${user}, course=${course}`);
    
    // Check if enrollment already exists
    const existingEnrollment = await model.findOne({ user, course });
    if (existingEnrollment) {
      console.log(`Enrollment already exists for user=${user}, course=${course}`);
      return existingEnrollment;
    }
    
    // Create new enrollment
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
  
  console.log(`Unenrolling user=${user} from course=${course}`);
  
  try {
    const result = await model.deleteOne({ user, course });
    console.log(`Unenrollment result:`, result);
    return result;
  } catch (error) {
    console.error("Error in unenrollUserFromCourse:", error);
    throw error;
  }
}

export async function findEnrollmentsForUser(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  
  try {
    return await model.find({ user: userId });
  } catch (error) {
    console.error("Error in findEnrollmentsForUser:", error);
    return [];
  }
}

export async function findEnrollmentsForCourse(courseId) {
  if (!courseId) {
    throw new Error("Course ID is required");
  }
  
  try {
    return await model.find({ course: courseId });
  } catch (error) {
    console.error("Error in findEnrollmentsForCourse:", error);
    return [];
  }
}