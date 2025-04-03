/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import db from "../Database";

// Load enrollments from localStorage if available, otherwise use db
const savedEnrollments = localStorage.getItem("enrollments");
const initialState = {
  enrollments: savedEnrollments ? JSON.parse(savedEnrollments) : db.enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
      // Also save to localStorage
      localStorage.setItem("enrollments", JSON.stringify(payload));
    },
    enroll: (state, { payload }) => {
      const newEnrollment = {
        _id: Math.random().toString(),
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments.push(newEnrollment);
      // Save updated enrollments to localStorage
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(
            enrollment.user === payload.userId &&
            enrollment.course === payload.courseId
          )
      );
      // Save updated enrollments to localStorage
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
