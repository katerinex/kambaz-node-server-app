// Kambaz/Quizzes/model.js
import mongoose from "mongoose";
import quizSchema, { quizAttemptSchema } from "./schema.js";

const QuizModel = mongoose.model("QuizModel", quizSchema);
const QuizAttemptModel = mongoose.model("QuizAttemptModel", quizAttemptSchema);

export default QuizModel;
export { QuizAttemptModel };