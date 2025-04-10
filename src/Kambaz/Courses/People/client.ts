/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};

export const updateUser = async (id: string, user: any) => {
  const response = await axios.put(`${USERS_API}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};
