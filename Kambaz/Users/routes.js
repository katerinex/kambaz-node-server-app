// Kambaz/Users/routes.js 

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

// Authentication middleware
const requireAuth = (req, res, next) => {
  console.log("Auth check - Session status:", !!req.session);
  console.log("Auth check - Current user:", req.session?.currentUser ? 
    `ID: ${req.session.currentUser._id}, Username: ${req.session.currentUser.username}` : 
    "No user");
  
  if (!req.session || !req.session.currentUser) {
    console.log("Authentication required but user not logged in");
    return res.status(401).json({ message: "Authentication required" });
  }
  
  next();
};

export default function UserRoutes(app) {
  // Route handlers remain the same as in your file
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.deleteUser(userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(req.session["currentUser"]);
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already in use" });
        return;
      }
      const newUser = await dao.createUser(req.body);
      req.session["currentUser"] = newUser;
      
      console.log("User created and session set:", {
        id: req.session.id,
        user: {
          _id: newUser._id,
          username: newUser.username,
          role: newUser.role
        }
      });
      
      res.json(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Error during signup" });
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      
      if (currentUser) {
        // Upon successful login, store the user object in the session.
        req.session["currentUser"] = currentUser;
        
        console.log("User authenticated and session set:", {
          id: req.session.id,
          user: {
            _id: currentUser._id,
            username: currentUser.username,
            role: currentUser.role
          }
        });
        
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Error during signin" });
    }
  };

  const signout = (req, res) => {
    const hadUser = !!req.session.currentUser;
    req.session.destroy();
    console.log("User signed out, session destroyed. Had user:", hadUser);
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    // Access the currentUser from the session.
    const currentUser = req.session["currentUser"];
    // If currentUser is not found in the session, the user is not authenticated.
    if (!currentUser) {
      console.log("Profile request denied - not authenticated");
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    // If currentUser exists in the session, send the user data back.
    console.log("Profile request - authenticated user:", currentUser.username);
    res.json(currentUser);
  };

  // Authentication check endpoint for debugging
  const checkAuth = async (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("Auth check - Session:", {
      id: req.session?.id,
      user: currentUser ? {
        _id: currentUser._id, 
        username: currentUser.username
      } : null
    });
    
    if (currentUser) {
      return res.json({
        isAuthenticated: true,
        user: {
          _id: currentUser._id,
          username: currentUser.username,
          role: currentUser.role
        }
      });
    } else {
      return res.json({
        isAuthenticated: false,
        message: "No active session found"
      });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "You must be logged in to create a course" });
        return;
      }
      
      console.log("Creating course with data:", req.body);
      const newCourse = await courseDao.createCourse(req.body);
      console.log("New course created:", newCourse);
      
      // Automatically enroll the creator in the course
      if (newCourse && newCourse._id) {
        try {
          console.log(`Auto-enrolling creator (${currentUser._id}) in new course (${newCourse._id})`);
          await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        } catch (enrollError) {
          console.error("Error enrolling creator in course:", enrollError);
          // Continue even if enrollment fails
        }
      }
      
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Error creating course", error: error.message });
    }
  };

  // CONSOLIDATED findCoursesForUser to handle both current and specific users
  const findCoursesForUser = async (req, res) => {
    // Check authentication first
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      console.log("Find courses for user denied - not authenticated");
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    // Get the user ID - either from params or current user
    let userId = req.params.userId;
    
    if (userId === "current") {
      userId = currentUser._id;
    }
    
    // If admin, return all courses
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      console.log(`Admin user ${currentUser.username} - returning all ${courses.length} courses`);
      res.json(courses);
      return;
    }
    
    console.log(`Finding courses for user ID: ${userId}`);
    
    try {
      // Get courses from enrollments
      const courses = await enrollmentsDao.findCoursesForUser(userId);
      console.log(`Found ${courses?.length || 0} courses for user ${userId}`);
      res.json(courses || []);
    } catch (error) {
      console.error("Error fetching courses for user:", error);
      res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
  };

  const enrollUserInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    let userId = req.params.userId;
    const courseId = req.params.courseId;
    
    if (userId === "current") {
      userId = currentUser._id;
    }
    
    if (!courseId || courseId === "undefined") {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    
    console.log(`Enrolling user ${userId} in course ${courseId}`);
    
    try {
      const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.json(status);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(400).json({ error: error.message });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    let userId = req.params.userId;
    const courseId = req.params.courseId;
    
    if (userId === "current") {
      userId = currentUser._id;
    }
    
    try {
      const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(400).json({ error: error.message });
    }
  };

  // 1. Authentication and special routes first
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/check-auth", checkAuth);
  
  // 2. Current user special routes
  app.post("/api/users/current/courses", requireAuth, createCourse);
  app.get("/api/users/current/courses", requireAuth, findCoursesForUser);
  
  // 3. Collection level routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  
  // 4. User-specific routes - CONSISTENT parameter naming (userId)
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", requireAuth, updateUser);
  app.delete("/api/users/:userId", requireAuth, deleteUser);
  
  // 5. User courses routes - CONSISTENT parameter naming
  app.get("/api/users/:userId/courses", requireAuth, findCoursesForUser);
  app.post("/api/users/:userId/courses/:courseId", requireAuth, enrollUserInCourse);  
  app.delete("/api/users/:userId/courses/:courseId", requireAuth, unenrollUserFromCourse);
}