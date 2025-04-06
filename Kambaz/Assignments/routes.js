// Kambaz/Assignments/routes.js

import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Run a one-time update for all assignments without published field
  (async () => {
    try {
      await dao.updateMissingPublishedFields();
    } catch (error) {
      console.error("Error running initial published field update:", error);
    }
  })();

  app.post("/api/assignments", async (req, res) => {
    try {
      console.log("Creating assignment with body:", req.body);
      console.log("Published in request:", req.body.published);
      
      const assignment = await dao.createAssignment(req.body);
      console.log("Created assignment:", assignment);
      res.json(assignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ message: "Error creating assignment", error: error.message });
    }
  });

  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "Error fetching assignments", error: error.message });
    }
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const assignment = await dao.findAssignmentById(req.params.assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.json(assignment);
    } catch (error) {
      console.error(`Error fetching assignment ${req.params.assignmentId}:`, error);
      res.status(500).json({ message: "Error fetching assignment", error: error.message });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      console.log("Update request received for assignment:", req.params.assignmentId);
      console.log("Request body:", req.body);
      console.log("Published status in request:", req.body.published);
      
      const result = await dao.updateAssignment(req.params.assignmentId, req.body);
      
      if (result.modifiedCount > 0) {
        // After updating, fetch the updated assignment to verify and return it
        const updatedAssignment = await dao.findAssignmentById(req.params.assignmentId);
        console.log("Assignment after update:", updatedAssignment);
        res.status(200).json(updatedAssignment);
      } else {
        res.status(404).json({ message: "Assignment not found or not modified" });
      }
    } catch (error) {
      console.error(`Error updating assignment ${req.params.assignmentId}:`, error);
      res.status(500).json({ message: "Error updating assignment", error: error.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const result = await dao.deleteAssignment(req.params.assignmentId);
      if (result.deletedCount > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Assignment not found" });
      }
    } catch (error) {
      console.error(`Error deleting assignment ${req.params.assignmentId}:`, error);
      res.status(500).json({ message: "Error deleting assignment", error: error.message });
    }
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log(`Getting assignments for course: ${courseId}`);
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }
      
      const assignments = await dao.findAssignmentsForCourse(courseId);
      console.log("Published assignments being returned:", 
        assignments.filter(a => a.published === true).length);
      
      res.json(assignments);
    } catch (error) {
      console.error(`Error fetching assignments for course ${req.params.courseId}:`, error);
      res.status(500).json({ message: "Error fetching course assignments", error: error.message });
    }
  });

  app.patch("/api/assignments/:assignmentId/toggle-publish", async (req, res) => {
    try {
      const result = await dao.togglePublishStatus(req.params.assignmentId);
      if (result.success) {
        res.json({ published: result.published });
      } else {
        res.status(404).json({ message: "Assignment not found or not modified" });
      }
    } catch (error) {
      console.error(`Error toggling publish status for ${req.params.assignmentId}:`, error);
      res.status(500).json({ message: "Error toggling publish status", error: error.message });
    }
  });
}