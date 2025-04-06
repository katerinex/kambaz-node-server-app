// Kambaz/Users/routes.js - Corrected route order and fixed createCourse

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

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
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = await dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      // Upon successful login, store the user object in the session.
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    // Access the currentUser from the session.
    const currentUser = req.session["currentUser"];
    // If currentUser is not found in the session, the user is not authenticated.
    if (!currentUser) {
      res.sendStatus(401); // Respond with Unauthorized status.
      return;
    }
    // If currentUser exists in the session, send the user data back.
    res.json(currentUser);
  };

  // ADD THIS FUNCTION - createCourse that was missing
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
      res.sendStatus(401);
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
      res.sendStatus(401);
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
      res.sendStatus(401);
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

  // THE FIX: ROUTE ORDER AND CONSISTENT PARAMETER NAMING
  
  // 1. Authentication and special routes first
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);   // Use only GET, since you're retrieving data
  
  // 2. Current user special routes
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/current/courses", findCoursesForUser);
  
  // 3. Collection level routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  
  // 4. User-specific routes - CONSISTENT parameter naming (userId)
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  
  // 5. User courses routes - CONSISTENT parameter naming
  app.get("/api/users/:userId/courses", findCoursesForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);  
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}