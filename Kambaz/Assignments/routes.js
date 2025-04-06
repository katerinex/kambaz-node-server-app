// Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    try {
      const assignment = await dao.createAssignment(req.body);
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
      const result = await dao.updateAssignment(req.params.assignmentId, req.body);
      if (result.modifiedCount > 0) {
        res.sendStatus(204);
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
      res.json(assignments);
    } catch (error) {
      console.error(`Error fetching assignments for course ${req.params.courseId}:`, error);
      res.status(500).json({ message: "Error fetching course assignments", error: error.message });
    }
  });
}