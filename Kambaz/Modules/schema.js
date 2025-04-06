// Kambaz/Modules/schema.js

import mongoose from "mongoose";

// Define the lesson schema first
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
  }
}, { _id: false }); // Don't auto-generate _id for embedded docs

// Define the module schema
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
    // Add lessons array to schema to match your data
    lessons: [lessonSchema]
  },
  { collection: "modules" }
);

export default schema;