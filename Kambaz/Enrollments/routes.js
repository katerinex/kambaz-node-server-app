// Kambaz/Enrollments/routes.js
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const enrollment = dao.enrollUserInCourse(req.body.user, req.body.course);
    res.json(enrollment);
  });

  app.delete("/api/enrollments", (req, res) => {
    dao.unenrollUserFromCourse(req.body.user, req.body.course);
    res.sendStatus(204);
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const enrollments = dao.findEnrollmentsForUser(req.params.userId);
    res.json(enrollments);
  });

  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const enrollments = dao.findEnrollmentsForCourse(req.params.courseId);
    res.json(enrollments);
  });
}