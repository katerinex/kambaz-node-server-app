// Kambaz/Assignments/dao.js

import AssignmentModel from "./model.js";

export const createAssignment = async (assignment) => {
  try {
    console.log("Creating assignment:", assignment);
    // Don't auto-generate _id if it's provided
    return await AssignmentModel.create(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const findAllAssignments = async () => {
  try {
    const assignments = await AssignmentModel.find();
    console.log(`Found ${assignments.length} total assignments`);
    return assignments;
  } catch (error) {
    console.error("Error finding all assignments:", error);
    return [];
  }
};

export const findAssignmentById = async (assignmentId) => {
  try {
    console.log(`Finding assignment by ID: ${assignmentId}`);
    // Use findOne with _id instead of findById for string IDs
    const assignment = await AssignmentModel.findOne({ _id: assignmentId });
    console.log("Found assignment:", assignment ? "Yes" : "No");
    return assignment;
  } catch (error) {
    console.error(`Error finding assignment by ID ${assignmentId}:`, error);
    return null;
  }
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  try {
    console.log(`Updating assignment ${assignmentId} with:`, assignmentUpdates);
    return await AssignmentModel.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  } catch (error) {
    console.error(`Error updating assignment ${assignmentId}:`, error);
    throw error;
  }
};

export const deleteAssignment = async (assignmentId) => {
  try {
    console.log(`Deleting assignment: ${assignmentId}`);
    return await AssignmentModel.deleteOne({ _id: assignmentId });
  } catch (error) {
    console.error(`Error deleting assignment ${assignmentId}:`, error);
    throw error;
  }
};

export const findAssignmentsForCourse = async (courseId) => {
  try {
    console.log(`Finding assignments for course: ${courseId}`);
    // Make sure we're querying with the exact course ID format
    const assignments = await AssignmentModel.find({ course: courseId });
    console.log(`Found ${assignments.length} assignments for course ${courseId}`);
    console.log("Assignments:", JSON.stringify(assignments, null, 2));
    return assignments;
  } catch (error) {
    console.error(`Error finding assignments for course ${courseId}:`, error);
    return [];
  }
};