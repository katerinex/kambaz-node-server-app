// src/Kambaz/Courses/Enrollments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import enrollments from "../../Database/enrollments.json";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState: Enrollment[] = enrollments;

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state.push(action.payload);
    },
    deleteEnrollment: (state, action: PayloadAction<string>) => {
      return state.filter((enrollment) => enrollment._id !== action.payload);
    },
    toggleEnrollment: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      const existingEnrollment = state.find(
        (enrollment) => enrollment.user === user && enrollment.course === course
      );

      if (existingEnrollment) {
        return state.filter((enrollment) => enrollment._id !== existingEnrollment._id);
      } else {
        const newEnrollment: Enrollment = {
          _id: String(Date.now()),
          user,
          course,
        };
        state.push(newEnrollment);
      }
    },
  },
});

export const { addEnrollment, deleteEnrollment, toggleEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;