import axios from "axios";

const baseUrl = "http://localhost:8080/";

const register = (payload) => {
  return axios.post(`${baseUrl}api/participate/register`, payload);
};
const getRegisteredEvents = (id) => {
  return axios.get(`${baseUrl}api/participate/registered/${id}`);
};
const getAttendedEvents = (id) => {
  return axios.get(`${baseUrl}api/participate/attended/${id}`);
};
const unregister = (payload) => {
  return axios.post(`${baseUrl}api/participate/unregister`, payload);
};
const markAttendance = (payload) => {
  return axios.post(`${baseUrl}api/participate/markattended`, payload);
};

export default {
  register,
  getRegisteredEvents,
  getAttendedEvents,
  unregister,
  markAttendance,
};
