// Kambaz/Enrollments/schema.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    // Add _id field as specified in your assignment
    _id: String,
    course: { type: String, ref: "CourseModel" }, // Changed from ObjectId to String
    user: { type: String, ref: "UserModel" },     // Changed from ObjectId to String
    grade: Number,
    letterGrade: String,
    enrollmentDate: Date,
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;