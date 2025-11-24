import axios from "axios";

const baseUrl = "http://localhost:8080/";

const create = (user) => {
  return axios.post(`${baseUrl}api/users/`, user);
};
const getOne = (id) => {
  return axios.get(`${baseUrl}api/users/${id}`);
};
const getAll = () => {
  return axios.get(`${baseUrl}api/users`);
};
const updateUser = (id, user) => {
  return axios.patch(`${baseUrl}api/users/${id}`, user);
};
const deleteUser = (id) => {
  return axios.delete(`${baseUrl}api/users/${id}`);
};
const login = (userDetail) => {
  return axios.post(`${baseUrl}api/auth/`, userDetail);
};
const verifyEmail = (token) => {
  return axios.get(`${baseUrl}api/users/verify/${token}`);
};
const logout = () => {
  return axios.post(`${baseUrl}auth/logout`)
}



export default {
  create,
  getOne,
  getAll,
  updateUser,
  deleteUser,
  login,
  verifyEmail,
  logout
};
