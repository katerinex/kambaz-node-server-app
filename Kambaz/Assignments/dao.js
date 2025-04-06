// Kambaz/Assignments/dao.js


import AssignmentModel from "./model.js";

export const createAssignment = async (assignment) => {
  try {
    console.log("Creating assignment:", assignment);
    // Ensure published field is included
    const assignmentWithPublished = {
      ...assignment,
      published: assignment.published === true
    };
    
    // Don't auto-generate _id if it's provided
    return await AssignmentModel.create(assignmentWithPublished);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const findAllAssignments = async () => {
  try {
    const assignments = await AssignmentModel.find();
    console.log(`Found ${assignments.length} total assignments`);
    console.log("Published assignments:", 
      assignments.filter(a => a.published === true).length);
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
    if (assignment) {
      console.log("Assignment published status:", assignment.published);
    }
    return assignment;
  } catch (error) {
    console.error(`Error finding assignment by ID ${assignmentId}:`, error);
    return null;
  }
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  try {
    console.log(`Updating assignment ${assignmentId} with:`, assignmentUpdates);
    console.log("Published status in update:", assignmentUpdates.published);
    
    // Ensure the published field is explicitly set
    const updates = {
      ...assignmentUpdates,
      published: assignmentUpdates.published === true
    };
    
    const result = await AssignmentModel.updateOne(
      { _id: assignmentId },
      { $set: updates }
    );
    
    console.log("Update result:", result);
    
    // Verify the update went through
    const updatedAssignment = await findAssignmentById(assignmentId);
    console.log("Assignment after update:", updatedAssignment);
    
    return result;
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
    console.log("Published assignments for this course:", 
      assignments.filter(a => a.published === true).length);
    return assignments;
  } catch (error) {
    console.error(`Error finding assignments for course ${courseId}:`, error);
    return [];
  }
};

export const togglePublishStatus = async (assignmentId) => {
  try {
    console.log(`Toggling publish status for assignment: ${assignmentId}`);
    
    // First find the current assignment to get its published status
    const assignment = await findAssignmentById(assignmentId);
    if (!assignment) {
      throw new Error(`Assignment with ID ${assignmentId} not found`);
    }
    
    // Toggle the published status
    const newPublishedStatus = !assignment.published;
    console.log(`Changing published from ${assignment.published} to ${newPublishedStatus}`);
    
    // Update the assignment
    const result = await updateAssignment(assignmentId, { published: newPublishedStatus });
    console.log(`Assignment ${assignmentId} published status updated to ${newPublishedStatus}`);
    
    return { 
      success: result.modifiedCount > 0,
      published: newPublishedStatus
    };
  } catch (error) {
    console.error(`Error toggling publish status for ${assignmentId}:`, error);
    throw error;
  }
};

// Add this function to fix existing assignments without published field
export const updateMissingPublishedFields = async () => {
  try {
    console.log("Updating assignments without published field");
    const result = await AssignmentModel.updateMany(
      { published: { $exists: false } },
      { $set: { published: false } }
    );
    console.log(`Updated ${result.modifiedCount} assignments with missing published field`);
    return result;
  } catch (error) {
    console.error("Error updating assignments with missing published field:", error);
    throw error;
  }
};