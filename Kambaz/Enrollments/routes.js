// Kambaz/Enrollments/routes.js
import * as dao from "./dao.js";
// Remove mongoose import since we're not using ObjectIds

export default function EnrollmentRoutes(app) {
  // Update existing routes with async/await
  app.post("/api/enrollments", async (req, res) => {
    try {
      const enrollment = await dao.enrollUserInCourse(req.body.user, req.body.course);
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.delete("/api/enrollments", async (req, res) => {
    try {
      await dao.unenrollUserFromCourse(req.body.user, req.body.course);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      const enrollments = await dao.findEnrollmentsForUser(req.params.userId);
      res.json(enrollments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const enrollments = await dao.findEnrollmentsForCourse(req.params.courseId);
      res.json(enrollments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Update route to handle the enrollment from the client
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const courseId = req.params.courseId;
      
      console.log(`Enrollment request received - userId: ${userId}, courseId: ${courseId}`);
      
      if (!courseId || courseId === "undefined") {
        return res.status(400).json({ error: "Invalid course ID" });
      }
      
      // Pass string IDs directly
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error("Enrollment error:", error);
      res.status(400).json({ error: error.message });
    }
  });
  
  // Update route to handle unenrollment
  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const courseId = req.params.courseId;
      
      // Pass string IDs directly
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Unenrollment error:", error);
      res.status(400).json({ error: error.message });
    }
  });
}