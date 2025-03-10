// Kambaz/Modules/dao.js
import model from "./model.js";

export const createModule = async (module) => {
  delete module._id;
  return model.create(module);
};

export const findModulesForCourse = async (courseId) => {
  return model.find({ course: courseId });
};

export const deleteModule = async (moduleId) => {
  return model.deleteOne({ _id: moduleId });
};

export const updateModule = async (moduleId, moduleUpdates) => {
  return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
};