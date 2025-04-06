// Kambaz/Quizzes/routes.js
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  console.log("Registering Quiz Routes");
  
  // Create a new quiz
  app.post("/api/quizzes", async (req, res) => {
    console.log("POST /api/quizzes called with data:", req.body);
    try {
      const quiz = await dao.createQuiz(req.body);
      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Error creating quiz", error: error.message });
    }
  });

  // Get all quizzes
  app.get("/api/quizzes", async (req, res) => {
    console.log("GET /api/quizzes called");
    try {
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Error fetching quizzes", error: error.message });
    }
  });

  // Get a specific quiz by ID
  app.get("/api/quizzes/:quizId", async (req, res) => {
    console.log(`GET /api/quizzes/${req.params.quizId} called`);
    try {
      const quiz = await dao.findQuizById(req.params.quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error(`Error fetching quiz ${req.params.quizId}:`, error);
      res.status(500).json({ message: "Error fetching quiz", error: error.message });
    }
  });

  // Update a quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    console.log(`PUT /api/quizzes/${req.params.quizId} called with data:`, req.body);
    try {
      const result = await dao.updateQuiz(req.params.quizId, req.body);
      if (result.modifiedCount > 0) {
        // Get updated quiz to return
        const updatedQuiz = await dao.findQuizById(req.params.quizId);
        res.json(updatedQuiz);
      } else {
        res.status(404).json({ message: "Quiz not found or not modified" });
      }
    } catch (error) {
      console.error(`Error updating quiz ${req.params.quizId}:`, error);
      res.status(500).json({ message: "Error updating quiz", error: error.message });
    }
  });

  // Delete a quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    console.log(`DELETE /api/quizzes/${req.params.quizId} called`);
    try {
      const result = await dao.deleteQuiz(req.params.quizId);
      if (result.deletedCount > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Quiz not found" });
      }
    } catch (error) {
      console.error(`Error deleting quiz ${req.params.quizId}:`, error);
      res.status(500).json({ message: "Error deleting quiz", error: error.message });
    }
  });

  // Get quizzes for a specific course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    console.log(`GET /api/courses/${req.params.courseId}/quizzes called`);
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }
      const quizzes = await dao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error(`Error fetching quizzes for course ${req.params.courseId}:`, error);
      res.status(500).json({ message: "Error fetching course quizzes", error: error.message });
    }
  });
}