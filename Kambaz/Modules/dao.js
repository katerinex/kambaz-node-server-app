// Kambaz/Modules/dao.js

import model from "./model.js";

export const createModule = async (module) => {
  try {
    console.log("Creating module:", module);
    // Don't delete _id - we may need it for string IDs
    return await model.create(module);
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

export const findModulesForCourse = async (courseId) => {
  try {
    console.log(`Finding modules for course: ${courseId}`);
    const modules = await model.find({ course: courseId });
    console.log(`Found ${modules.length} modules for course ${courseId}`);
    
    // Log first module for debugging if any were found
    if (modules.length > 0) {
      console.log("First module sample:", JSON.stringify(modules[0], null, 2));
    }
    
    return modules;
  } catch (error) {
    console.error(`Error finding modules for course ${courseId}:`, error);
    return [];
  }
};

export const findModuleById = async (moduleId) => {
  try {
    console.log(`Finding module by ID: ${moduleId}`);
    // Use findOne for string IDs instead of findById
    const module = await model.findOne({ _id: moduleId });
    return module;
  } catch (error) {
    console.error(`Error finding module by ID ${moduleId}:`, error);
    return null;
  }
};

export const deleteModule = async (moduleId) => {
  try {
    console.log(`Deleting module: ${moduleId}`);
    return await model.deleteOne({ _id: moduleId });
  } catch (error) {
    console.error(`Error deleting module ${moduleId}:`, error);
    throw error;
  }
};

export const updateModule = async (moduleId, moduleUpdates) => {
  try {
    console.log(`Updating module ${moduleId} with:`, moduleUpdates);
    return await model.updateOne(
      { _id: moduleId },
      { $set: moduleUpdates }
    );
  } catch (error) {
    console.error(`Error updating module ${moduleId}:`, error);
    throw error;
  }
};