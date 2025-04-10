// Kambaz/Modules/routes.js
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // Get modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log(`Getting modules for course: ${courseId}`);
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error getting modules:", error);
      res.status(500).json({ message: "Error getting modules", error: error.message });
    }
  });

  // Create module for a course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId
      };
      const newModule = await modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: "Error creating module", error: error.message });
    }
  });

  // Get lessons for a module
  app.get("/api/modules/:moduleId/lessons", async (req, res) => {
    try {
      const { moduleId } = req.params;
      console.log(`Getting lessons for module: ${moduleId}`);
      // Find the module first
      const module = await modulesDao.findModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      // Return the lessons array from the module
      res.json(module.lessons || []);
    } catch (error) {
      console.error("Error getting lessons:", error);
      res.status(500).json({ message: "Error getting lessons", error: error.message });
    }
  });

  // Get a single module by ID
  app.get("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const module = await modulesDao.findModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      console.error("Error getting module:", error);
      res.status(500).json({ message: "Error getting module", error: error.message });
    }
  });

  // Delete module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ message: "Error deleting module", error: error.message });
    }
  });

  // Update module - FIXED to handle entire module object
  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      
      // Log the full request body to see what's coming in
      console.log("Module update request body:", JSON.stringify(moduleUpdates, null, 2));
      
      // Ensure _id is present in the module object
      if (!moduleUpdates._id) {
        moduleUpdates._id = moduleId;
      }
      
      // Call the updated DAO function with the entire module object
      const updatedModule = await modulesDao.updateModule(moduleUpdates);
      
      if (!updatedModule) {
        return res.status(404).json({ message: "Module not found or update failed" });
      }
      
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ 
        message: "Error updating module", 
        error: error.message,
        stack: error.stack
      });
    }
  });
}