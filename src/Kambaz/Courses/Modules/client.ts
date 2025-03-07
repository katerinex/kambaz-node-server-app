// src/Kambaz/Courses/Modules/client.ts

import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  await axios.delete(`${MODULES_API}/${moduleId}`);
};

export const updateModule = async (module: any) => {
  await axios.put(`${MODULES_API}/${module._id}`, module);
};
