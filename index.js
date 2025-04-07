// index.js
import "dotenv/config";
import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import SessionController from "./Lab5/SessionController.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js"; 


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();

// Trust proxy - critical for cookies to work through Render/Netlify
app.set('trust proxy', process.env.TRUST_PROXY === '1' ? 1 : 0);
console.log(`Trust proxy setting: ${process.env.TRUST_PROXY === '1' ? 'enabled' : 'disabled'}`);

// Multiple origins CORS configuration
const FRONTEND_URLS = [
  process.env.NETLIFY_URL,
  "https://jovial-elf-866e6f.netlify.app", // Add the explicit production URL
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean); // Filter out undefined/null values

console.log("Allowed CORS origins:", FRONTEND_URLS);

app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (FRONTEND_URLS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Session configuration with enhanced settings for production
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
};

// Production cookie settings with detailed logging
if (process.env.NODE_ENV !== "development") {
  console.log("Configuring session for production environment");
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  };
  
  // Log the session configuration
  console.log("Session configuration:", {
    proxy: sessionOptions.proxy,
    cookie: {
      httpOnly: sessionOptions.cookie.httpOnly,
      sameSite: sessionOptions.cookie.sameSite,
      secure: sessionOptions.cookie.secure,
      maxAge: sessionOptions.cookie.maxAge
    }
  });
} else {
  console.log("Using development session configuration");
}

app.use(session(sessionOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add debug middleware to log session details on each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} | Session ID: ${req.session.id} | User: ${
    req.session.currentUser ? req.session.currentUser.username : 'none'
  }`);
  next();
});

// Routes
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
SessionController(app);
QuizRoutes(app); // Register the Quiz routes

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "API connection successful",
    cors: {
      allowedOrigins: FRONTEND_URLS
    }
  });
});

// Auth check endpoint for debugging
app.get("/api/auth-status", (req, res) => {
  res.json({
    isAuthenticated: !!req.session.currentUser,
    sessionId: req.session.id,
    user: req.session.currentUser ? {
      id: req.session.currentUser._id,
      username: req.session.currentUser.username,
      role: req.session.currentUser.role
    } : null
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});