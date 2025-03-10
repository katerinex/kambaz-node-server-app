// Kambaz/Assignments/schema.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel' },
  points: Number,
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date,
}, { collection: "assignments" });

export default assignmentSchema;