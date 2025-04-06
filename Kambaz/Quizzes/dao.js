// Kambaz/Quizzes/dao.js
import QuizModel from "./model.js";

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