/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Original enrollment functions
export const findAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(
    `${REMOTE_SERVER}/api/users/${userId}/enrollments`
  );
  return data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(ENROLLMENTS_API, {
    user: userId,
    course: courseId,
  });
  return data;
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  const { data } = await axios.delete(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollments`
  );
  return data;
};
