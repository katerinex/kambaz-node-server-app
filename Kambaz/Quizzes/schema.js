// Kambaz/Quizzes/schema.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed
});

const quizSchema = new mongoose.Schema({
  // Add support for string IDs
  _id: {
    type: String,
    required: true
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
    default: 60
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
    default: false
  },
  webcamRequired: {
    type: Boolean,
    default: false
  },
  lockQuestionsAfterAnswering: {
    type: Boolean,
    default: false
  }
}, { collection: "quizzes" });

export default quizSchema;