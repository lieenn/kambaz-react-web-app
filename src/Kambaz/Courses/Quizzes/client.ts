/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  try {
    console.log("Fetching quizzes for course:", courseId);
    const response = await axios.get(`${QUIZZES_API}/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes for course:", error);
    return [];
  }
};

export const createQuiz = async (courseId: string, quiz: any) => {
  try {
    const response = await axios.post(QUIZZES_API, {
      ...quiz,
      course: courseId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizId: string) => {
  try {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};
