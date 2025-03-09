// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: Assignment[] = []; // Initialize as an empty array

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
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      return action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;