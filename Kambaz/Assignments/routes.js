// Kambaz/Assignments/routes.js

import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  });

  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.assignmentId);
    res.json(assignment);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const assignment = await dao.updateAssignment(req.params.assignmentId, req.body);
    if (assignment) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    await dao.deleteAssignment(req.params.assignmentId);
    res.sendStatus(204);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  });
}