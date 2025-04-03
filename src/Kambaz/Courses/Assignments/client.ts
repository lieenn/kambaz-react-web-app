/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

export const findAssignmentsByCourse = async (courseId: string) => {
  try {
    console.log(`Fetching assignments for course ${courseId}`);
    const response = await axios.get(
      `${API_BASE}/courses/${courseId}/assignments`
    );
    console.log("Assignments response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in findAssignmentsByCourse:", error);
    return [];
  }
};

export const findAssignmentById = async (
  courseId: string,
  assignmentId: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE}/courses/${courseId}/assignments/${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    return null;
  }
};

export const createAssignment = async (courseId: string, assignment: any) => {
  try {
    const response = await axios.post(
      `${API_BASE}/courses/${courseId}/assignments`,
      assignment
    );
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const updateAssignment = async (
  courseId: string,
  assignmentId: string,
  assignment: any
) => {
  try {
    const response = await axios.put(
      `${API_BASE}/courses/${courseId}/assignments/${assignmentId}`,
      assignment
    );
    return response.data;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
};

export const deleteAssignment = async (
  courseId: string,
  assignmentId: string
) => {
  try {
    const response = await axios.delete(
      `${API_BASE}/courses/${courseId}/assignments/${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};
