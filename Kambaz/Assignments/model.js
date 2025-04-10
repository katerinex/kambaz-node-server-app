// Kambaz/Assignments/model.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  // String ID to match your data format
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  // Course ID as string
  course: {
    type: String,
    required: true
  },
  // Assignment group for UI display
  group: {
    type: String,
    default: "Assignments"
  },
  // Points/value of the assignment
  points: {
    type: Number,
    default: 10
  },
  // Dates
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date,
  // Published status to control visibility
  published: {
    type: Boolean,
    default: true  // Default to published for existing assignments
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: "assignments" });

// Update timestamps on save
assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const AssignmentModel = mongoose.model('Assignment', assignmentSchema);
export default AssignmentModel;