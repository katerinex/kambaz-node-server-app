// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import assignments from "../../Database/assignments.json";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  course: string;
}

const initialState: Assignment[] = assignments;

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      return state.filter((assignment) => assignment._id !== action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const index = state.findIndex((assignment) => assignment._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;