// Kambaz/Courses/dao.js
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export const findAllCourses = async () => {
  try {
    const courses = await model.find();
    console.log(`Found ${courses.length} total courses`);
    return courses;
  } catch (error) {
    console.error("Error finding all courses:", error);
    return [];
  }
};

export const findCourseById = async (courseId) => {
  try {
    const course = await model.findById(courseId);
    return course;
  } catch (error) {
    console.error(`Error finding course by ID ${courseId}:`, error);
    return null;
  }
};

export const createCourse = async (course) => {
  try {
    console.log("Creating course:", course);
    // Don't delete _id - we need to use the string ID provided
    const newCourse = await model.create(course);
    console.log("Course created with ID:", newCourse._id);
    return newCourse;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    console.log(`Deleting course: ${courseId}`);
    const status = await model.deleteOne({ _id: courseId });
    
    // Also delete all enrollments for this course
    try {
      await enrollmentModel.deleteMany({ course: courseId });
    } catch (enrollmentError) {
      console.error("Error deleting course enrollments:", enrollmentError);
    }
    
    return status;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseUpdates) => {
  try {
    console.log(`Updating course ${courseId} with:`, courseUpdates);
    const status = await model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );
    return status;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const findCoursesForEnrolledUser = async (userId) => {
  try {
    console.log(`Finding courses for enrolled user: ${userId}`);
    
    // Use the enrollmentModel to find enrollments
    const enrollments = await enrollmentModel.find({ user: userId });
    console.log(`Found ${enrollments.length} enrollments for user ${userId}`);
    
    if (enrollments.length === 0) {
      return [];
    }
    
    // Extract course IDs
    const courseIds = enrollments.map(enrollment => enrollment.course);
    
    // Find all courses with these IDs
    const courses = await model.find({ _id: { $in: courseIds } });
    console.log(`Found ${courses.length} courses for user ${userId}`);
    
    // Add enrolled flag
    return courses.map(course => ({
      ...course.toObject(),
      enrolled: true
    }));
  } catch (error) {
    console.error(`Error finding enrolled courses for user ${userId}:`, error);
    return [];
  }
};