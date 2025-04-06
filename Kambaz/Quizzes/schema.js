// Kambaz/Quizzes/schema.js
import mongoose from "mongoose";

// Schema for multiple choice or true/false question choice
const choiceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

// Schema for fill in the blank answer
const blankAnswerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// Updated question schema matching frontend structure
const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: String,
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'fill_blank', 'multiple-choice', 'true-false', 'short-answer'],
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  text: String, // For backward compatibility
  points: {
    type: Number,
    default: 1
  },
  choices: [choiceSchema],
  options: [String], // For backward compatibility
  correctAnswer: mongoose.Schema.Types.Mixed, // For both true/false questions and backward compatibility
  blankAnswers: [blankAnswerSchema] // For fill in the blank questions
});

// Schema for a single answer to a question
const quizAnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  answer: mongoose.Schema.Types.Mixed, // Can be string, array, boolean, etc.
  isCorrect: Boolean
});

// Schema for quiz attempts
const quizAttemptSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  quizId: {
    type: String,
    ref: 'QuizModel',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  answers: [quizAnswerSchema],
  completed: {
    type: Boolean,
    default: false
  },
  timeSpent: {
    type: Number,  // in seconds
    default: 0
  },
  isPreview: {
    type: Boolean,
    default: false
  }
});

const quizSchema = new mongoose.Schema({
  // Add support for string IDs
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  quizType: {
    type: String,
    enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
    required: false,
    default: 'Graded Quiz'
  },
  published: {
    type: Boolean,
    default: false
  },
  points: Number,
  course: {
    type: String,
    ref: 'CourseModel',
    required: true
  },
  module: {
    type: String,
    ref: 'ModuleModel'
  },
  questions: [questionSchema],
  assignmentGroup: {
    type: String,
    enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
    default: 'Quizzes'
  },
  availableDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  untilDate: {
    type: Date,
    default: function() {
      return new Date(+new Date() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
    }
  },
  timeLimit: {
    type: Number,
    default: 20
  },
  multipleAttempts: {
    type: Boolean,
    default: false
  },
  attemptsAllowed: {
    type: Number,
    default: 1
  },
  shuffleAnswers: {
    type: Boolean,
    default: true
  },
  showCorrectAnswers: {
    type: Boolean,
    default: false
  },
  accessCode: String,
  oneQuestionAtATime: {
    type: Boolean,
    default: true
  },
  webcamRequired: {
    type: Boolean,
    default: false
  },
  lockQuestionsAfterAnswering: {
    type: Boolean,
    default: false
  },
  attempts: [quizAttemptSchema]
}, { collection: "quizzes" });

export default quizSchema;
export { quizAttemptSchema };