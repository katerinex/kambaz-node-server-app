// Kambaz/Quizzes/dao.js
import QuizModel, { QuizAttemptModel } from "./model.js";

// Quiz CRUD functions
export const createQuiz = async (quiz) => {
  try {
    console.log("Creating quiz:", quiz);
    return await QuizModel.create(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const findAllQuizzes = async () => {
  try {
    const quizzes = await QuizModel.find();
    console.log(`Found ${quizzes.length} total quizzes`);
    return quizzes;
  } catch (error) {
    console.error("Error finding all quizzes:", error);
    return [];
  }
};

export const findQuizById = async (quizId) => {
  try {
    console.log(`Finding quiz by ID: ${quizId}`);
    const quiz = await QuizModel.findOne({ _id: quizId });
    console.log("Found quiz:", quiz ? "Yes" : "No");
    return quiz;
  } catch (error) {
    console.error(`Error finding quiz by ID ${quizId}:`, error);
    return null;
  }
};

export const updateQuiz = async (quizId, quizUpdates) => {
  try {
    console.log(`Updating quiz ${quizId} with:`, quizUpdates);
    return await QuizModel.updateOne(
      { _id: quizId },
      { $set: quizUpdates }
    );
  } catch (error) {
    console.error(`Error updating quiz ${quizId}:`, error);
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    console.log(`Deleting quiz: ${quizId}`);
    return await QuizModel.deleteOne({ _id: quizId });
  } catch (error) {
    console.error(`Error deleting quiz ${quizId}:`, error);
    throw error;
  }
};

export const findQuizzesForCourse = async (courseId) => {
  try {
    console.log(`Finding quizzes for course: ${courseId}`);
    // Add more detailed debugging
    const query = { course: courseId };
    console.log("MongoDB query:", JSON.stringify(query));
    const quizzes = await QuizModel.find(query);
    console.log(`Found ${quizzes.length} quizzes for course ${courseId}`);
    if (quizzes.length === 0) {
      console.log("No quizzes found. Checking all available quizzes...");
      const allQuizzes = await QuizModel.find();
      console.log(`Total quizzes in database: ${allQuizzes.length}`);
      console.log("Available course IDs in quizzes:", allQuizzes.map(q => q.course));
    } else {
      console.log("Quizzes found:", JSON.stringify(quizzes.map(q => ({ id: q._id, title: q.title })), null, 2));
    }
    return quizzes;
  } catch (error) {
    console.error(`Error finding quizzes for course ${courseId}:`, error);
    throw error; // Changed to throw the error to better handle it in the routes
  }
};

// Quiz Attempt functions
export const createQuizAttempt = async (attempt) => {
  try {
    console.log("Creating quiz attempt:", attempt);
    // Create the attempt in the standalone collection
    const newAttempt = await QuizAttemptModel.create(attempt);
    
    // Also add it to the quiz's attempts array
    await QuizModel.updateOne(
      { _id: attempt.quizId },
      { $push: { attempts: newAttempt } }
    );
    
    return newAttempt;
  } catch (error) {
    console.error("Error creating quiz attempt:", error);
    throw error;
  }
};

export const findQuizAttemptById = async (attemptId) => {
  try {
    console.log(`Finding quiz attempt by ID: ${attemptId}`);
    const attempt = await QuizAttemptModel.findOne({ _id: attemptId });
    console.log("Found quiz attempt:", attempt ? "Yes" : "No");
    return attempt;
  } catch (error) {
    console.error(`Error finding quiz attempt by ID ${attemptId}:`, error);
    return null;
  }
};

export const findQuizAttemptsByQuizAndUser = async (quizId, userId, isPreview = false) => {
  try {
    console.log(`Finding quiz attempts for quiz ${quizId} and user ${userId} (isPreview: ${isPreview})`);
    
    const query = { 
      quizId: quizId,
      userId: userId 
    };
    
    if (isPreview !== undefined) {
      query.isPreview = isPreview;
    }
    
    const attempts = await QuizAttemptModel.find(query).sort({ timestamp: -1 });
    console.log(`Found ${attempts.length} attempts for query:`, query);
    
    return attempts;
  } catch (error) {
    console.error(`Error finding attempts for quiz ${quizId} and user ${userId}:`, error);
    return [];
  }
};

export const updateQuizAttempt = async (attemptId, attemptUpdates) => {
  try {
    console.log(`Updating quiz attempt ${attemptId} with:`, attemptUpdates);
    
    // Update in the standalone collection
    const result = await QuizAttemptModel.updateOne(
      { _id: attemptId },
      { $set: attemptUpdates }
    );
    
    // Also update in the quiz's attempts array
    // This is more complex as we need to find which quiz contains this attempt
    const attempt = await QuizAttemptModel.findOne({ _id: attemptId });
    if (attempt) {
      await QuizModel.updateOne(
        { 
          _id: attempt.quizId,
          "attempts._id": attemptId 
        },
        { 
          $set: { "attempts.$": { ...attempt.toObject(), ...attemptUpdates } } 
        }
      );
    }
    
    return result;
  } catch (error) {
    console.error(`Error updating quiz attempt ${attemptId}:`, error);
    throw error;
  }
};

export const deleteQuizAttempt = async (attemptId) => {
  try {
    console.log(`Deleting quiz attempt: ${attemptId}`);
    
    // Find the attempt first to get the quizId
    const attempt = await QuizAttemptModel.findOne({ _id: attemptId });
    
    // Delete from standalone collection
    const result = await QuizAttemptModel.deleteOne({ _id: attemptId });
    
    // Also remove from quiz's attempts array if found
    if (attempt) {
      await QuizModel.updateOne(
        { _id: attempt.quizId },
        { $pull: { attempts: { _id: attemptId } } }
      );
    }
    
    return result;
  } catch (error) {
    console.error(`Error deleting quiz attempt ${attemptId}:`, error);
    throw error;
  }
};