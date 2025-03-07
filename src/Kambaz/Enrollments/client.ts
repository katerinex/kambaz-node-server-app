// src/Kambaz/Enrollments/client.ts
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (user: string, course: string) => {
  const response = await axios.post(ENROLLMENTS_API, { user, course });
  return response.data;
};

export const unenrollUserFromCourse = async (user: string, course: string) => {
  await axios.delete(ENROLLMENTS_API, { data: { user, course } });
};

export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(`<span class="math-inline">\{REMOTE\_SERVER\}/api/users/</span>{userId}/enrollments`);
  return response.data;
}
