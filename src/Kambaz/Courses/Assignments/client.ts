// src/Kambaz/Courses/Assignments/client.ts
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const createAssignment = async (assignment: any) => {
  const response = await axios.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

export const findAllAssignments = async () => {
  const response = await axios.get(ASSIGNMENTS_API);
  return response.data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`<span class="math-inline">\{ASSIGNMENTS\_API\}/</span>{assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  await axios.put(`<span class="math-inline">\{ASSIGNMENTS\_API\}/</span>{assignment._id}`, assignment);
};

export const deleteAssignment = async (assignmentId: string) => {
  await axios.delete(`<span class="math-inline">\{ASSIGNMENTS\_API\}/</span>{assignmentId}`);
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`<span class="math-inline">\{REMOTE\_SERVER\}/api/courses/</span>{courseId}/assignments`);
  return response.data;
};