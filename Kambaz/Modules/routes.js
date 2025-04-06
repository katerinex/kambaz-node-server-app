// Kambaz/Modules/routes.js
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // Get modules for a course - this is the route causing the error
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

  // Update module
  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const status = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(status);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ message: "Error updating module", error: error.message });
    }
  });
}