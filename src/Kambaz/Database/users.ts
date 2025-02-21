// src/Kambaz/Database/users.ts

import { User } from "../types/User";
export const users: User[] = [
    {
      _id: "1",
      username: "faculty1",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@university.edu",
      role: "FACULTY",
      dateOfBirth: "1980-01-01"
    },
    {
      _id: "2",
      username: "student1",
      password: "password123",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@university.edu",
      role: "STUDENT",
      dateOfBirth: "2000-01-01"
    }
  ];
  