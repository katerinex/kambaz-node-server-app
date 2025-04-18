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

  // =========== Quiz Attempt Routes ===========

  // Create a new quiz attempt
  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    console.log(`POST /api/quizzes/${req.params.quizId}/attempts called with data:`, req.body);
    console.log("HIT ATTEMPTS ROUTE");
    const quizId = req.params.quizId;
    const userId = req.body.userId; 
    console.log(`USER ID: ${userId}`);

    try {
      const quiz = await dao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      if (!quiz.multipleAttempts) {
        const previousAttempts = await dao.findQuizAttemptsByQuizAndUser(quizId, userId);
        if (previousAttempts.length >= quiz.attemptsAllowed) {
          return res.status(403).json({ message: "Max number of attempts reached" });
        }
      }

      const attempt = {
        ...req.body,
        userId,
        quizId,
        _id: (new Date()).getTime()
      };

      const newAttempt = await dao.createQuizAttempt(attempt);
      res.json(newAttempt);
    } catch (error) {
      console.error("Error creating quiz attempt:", error);
      res.status(500).json({ message: "Error creating quiz attempt", error: error.message });
    }
  });

  // Get a specific quiz attempt
  app.get("/api/quiz-attempts/:attemptId", async (req, res) => {
    console.log(`GET /api/quiz-attempts/${req.params.attemptId} called`);
    try {
      const attempt = await dao.findQuizAttemptById(req.params.attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Quiz attempt not found" });
      }
      res.json(attempt);
    } catch (error) {
      console.error(`Error fetching quiz attempt ${req.params.attemptId}:`, error);
      res.status(500).json({ message: "Error fetching quiz attempt", error: error.message });
    }
  });

  // Get all attempts for a quiz by a user
  app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
    console.log(`GET /api/quizzes/${req.params.quizId}/attempts called with query:`, req.query);
    const userId = req.session["currentUser"] || req.query.userId;
    const isPreview = req.query.isPreview === 'true';
    console.log("Session:", req.session);
    console.log("Query:", req.query);
    console.log("Resolved userId:", userId);
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const attempts = await dao.findQuizAttemptsByQuizAndUser(
        req.params.quizId,
        userId,
        isPreview
      );

      console.log("ATTEMPTS", attempts);
      res.json(attempts);
    } catch (error) {
      console.error(`Error fetching quiz attempts for quiz ${req.params.quizId} and user ${userId}:`, error);
      res.status(500).json({ message: "Error fetching quiz attempts", error: error.message });
    }
  });

  // Update a quiz attempt (add answers, complete, etc.)
  app.put("/api/quiz-attempts/:attemptId", async (req, res) => {
    console.log(`PUT /api/quiz-attempts/${req.params.attemptId} called with data:`, req.body);
    try {
      const result = await dao.updateQuizAttempt(req.params.attemptId, req.body);
      if (result.modifiedCount > 0) {
        const updatedAttempt = await dao.findQuizAttemptById(req.params.attemptId);
        res.json(updatedAttempt);
      } else {
        res.status(404).json({ message: "Quiz attempt not found or not modified" });
      }
    } catch (error) {
      console.error(`Error updating quiz attempt ${req.params.attemptId}:`, error);
      res.status(500).json({ message: "Error updating quiz attempt", error: error.message });
    }
  });

  // Delete a quiz attempt
  app.delete("/api/quiz-attempts/:attemptId", async (req, res) => {
    console.log(`DELETE /api/quiz-attempts/${req.params.attemptId} called`);
    try {
      const result = await dao.deleteQuizAttempt(req.params.attemptId);
      if (result.deletedCount > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Quiz attempt not found" });
      }
    } catch (error) {
      console.error(`Error deleting quiz attempt ${req.params.attemptId}:`, error);
      res.status(500).json({ message: "Error deleting quiz attempt", error: error.message });
    }
  });
};