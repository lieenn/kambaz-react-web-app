import { createSlice } from "@reduxjs/toolkit";
import db from "../Database";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const newEnrollment = {
        _id: Math.random().toString(),
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === payload.userId &&
            enrollment.course === payload.courseId
          )
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
