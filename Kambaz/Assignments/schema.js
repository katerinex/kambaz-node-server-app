// Kambaz/Assignments/schema.js

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  // Add support for string IDs
  _id: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  // Change from ObjectId to String to match your data
  course: { 
    type: String, 
    ref: 'CourseModel' 
  },
  points: Number,
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date,
}, { collection: "assignments" });

export default assignmentSchema;