// index.js
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

// Enable trust proxy in production environments
// This is critical for cookies with SameSite=None, Secure to work
app.set('trust proxy', process.env.TRUST_PROXY === '1' ? 1 : 0);
console.log(`Trust proxy setting: ${process.env.TRUST_PROXY === '1' ? 'enabled' : 'disabled'}`);

// Multiple origins CORS configuration
const FRONTEND_URLS = [
  process.env.NETLIFY_URL,
  "https://jovial-elf-866e6f.netlify.app", 
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://jovial-elf-866e6f.netlify.app/#/Kambaz/Account/Signin",
  "https://67f332f27c1cd900085812db--jovial-elf-866e6f.netlify.app"
].filter(Boolean); 

console.log("Allowed CORS origins:", FRONTEND_URLS);

// CORS middleware with improved configuration
app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (FRONTEND_URLS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS: ${origin}`);
        // During development/troubleshooting, allow all origins
        // In production, you would use the line below instead
        callback(null, true); // Allow unknown origins during troubleshooting
        // callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-User-Id"]
  })
);

// Add token auth middleware - to handle X-User-Id header
app.use((req, res, next) => {
  const userId = req.headers['x-user-id'];
  
  // If we have a user ID in the header but no session user, try to load the user
  if (userId && (!req.session || !req.session.currentUser)) {
    // Logic to find and set the user based on ID would go here
    // For now, we'll just log it
    console.log(`Token auth attempt with user ID: ${userId}`);
  }
  
  next();
});

// Session configuration 
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
};

// Production cookie settings 
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

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    message: "CORS is working properly",
    headers: {
      origin: req.headers.origin,
      referer: req.headers.referer,
      'x-user-id': req.headers['x-user-id']
    },
    cookies: req.cookies,
    sessionId: req.session?.id || "no session"
  });
});

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

// Auth check endpoint for debugging - updated to check for X-User-Id header too
app.get("/api/auth-status", (req, res) => {
  // Check for token-based auth via header
  const userId = req.headers['x-user-id'];
  
  res.json({
    isAuthenticated: !!req.session.currentUser || !!userId,
    sessionId: req.session.id,
    tokenAuth: !!userId,
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