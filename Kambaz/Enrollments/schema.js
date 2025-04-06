// Kambaz/Enrollments/schema.js
//import mongoose from "mongoose";

//const enrollmentSchema = new mongoose.Schema(
  //{
    // Add _id field as specified in your assignment
   // _id: String,
   // course: { type: String, ref: "CourseModel" }, // Changed from ObjectId to String
    //user: { type: String, ref: "UserModel" },     // Changed from ObjectId to String
   // grade: Number,
    //letterGrade: String,
    //enrollmentDate: Date,
    //status: {
      //type: String,
      //enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      //default: "ENROLLED",
    //},
  //},
  //{ collection: "enrollments" }
//);

//export default enrollmentSchema;

// In Kambaz/Enrollments/schema.js, modify your schema:
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    // This is fine as string for a compound ID
    _id: String,
    
    // For references to string IDs, use this format:
    course: { 
      type: String, 
      ref: "CourseModel",
      required: true
    },
    
    user: { 
      type: String, 
      ref: "UserModel",
      required: true
    },
    
    grade: Number,
    letterGrade: String,
    
    // Add default date value
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  },
  { 
    collection: "enrollments",
    // Add timestamps for better debugging
    timestamps: true
  }
);

// Add a compound index to prevent duplicate enrollments
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default enrollmentSchema;