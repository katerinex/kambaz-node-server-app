// Kambaz/Assignments/dao.js
import AssignmentModel from "./model.js";

export const createAssignment = async (assignment) => {
  return AssignmentModel.create(assignment);
};

export const findAllAssignments = async () => {
  return AssignmentModel.find();
};

export const findAssignmentById = async (assignmentId) => {
  return AssignmentModel.findById(assignmentId);
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  return AssignmentModel.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
};

export const deleteAssignment = async (assignmentId) => {
  return AssignmentModel.deleteOne({ _id: assignmentId });
};

export const findAssignmentsForCourse = async (courseId) => {
  return AssignmentModel.find({ course: courseId });
};