// Kambaz/Users/schema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Set _id to be explicitly a String type with required: false
  // This will let MongoDB use string IDs from your data
  _id: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  // String type for compatibility with your test data
  dob: String,
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "ADMIN", "USER", "TA"],
    default: "USER",
  },
  loginId: String,
  section: String,
  // String type for compatibility with your test data
  lastActivity: String,
  totalActivity: String,
},
{ 
  collection: "users",
  // This is critical: it prevents Mongoose from overriding
  // your string IDs with ObjectIds
  _id: false 
});

export default userSchema;

