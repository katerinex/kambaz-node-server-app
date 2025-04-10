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
  // Course ID as string
  course: {
    type: String,
    ref: 'CourseModel',
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  // Add group field for proper grouping in UI
  group: {
    type: String,
    default: "Assignments"
  },
  // Add module field for organizing assignments
  module: String,
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date,
  published: {
    type: Boolean,
    default: false
  },
  // Add timestamp fields for better tracking
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: "assignments" });

// Update the updatedAt field on every save
assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default assignmentSchema;