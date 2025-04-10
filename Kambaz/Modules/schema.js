// Kambaz/Modules/schema.js
import mongoose from "mongoose";

// Define the lesson schema first with all required fields
const lessonSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: String,
  description: String,
  module: {
    type: String,
    ref: "ModuleModel"
  },
  // Add published field to lesson schema
  published: {
    type: Boolean,
    default: false
  },
  // Add points field to support lesson points
  points: {
    type: Number,
    default: 0
  }
}, { _id: false }); // Don't auto-generate _id for embedded docs

// Define the module schema with all required fields
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: String,
    description: String,
    course: {
      type: String,
      ref: "CourseModel"
    },
    // Add published field to module schema
    published: {
      type: Boolean,
      default: false
    },
    // Add lessons array to schema to match your data
    lessons: [lessonSchema]
  },
  { collection: "modules" }
);

export default schema;