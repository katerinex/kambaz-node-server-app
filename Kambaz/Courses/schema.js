// Kambaz/Courses/schema.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // Add this line to accept string IDs
    _id: {
      type: String,
      required: true
    },
    name: String,
    number: String,
    credits: Number,
    description: String,
    // Add these fields to match your data
    startDate: Date,
    endDate: Date,
    department: String,
    author: {
      type: String,
      ref: "UserModel"
    }
  },
  { collection: "courses" }
);

export default courseSchema;