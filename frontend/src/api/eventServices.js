import axios from "axios";

const baseUrl = "http://localhost:8080/";

const create = (user) => {
  return axios.post(`${baseUrl}api/events`, user);
};
const getOne = (id) => {
  return axios.get(`${baseUrl}api/events/${id}`);
};
const getAll = () => {
  return axios.get(`${baseUrl}api/events`);
};
const updateEvent = (id, user) => {
  return axios.patch(`${baseUrl}api/events`, user);
};
const deleteEvent = (id) => {
  return axios.delete(`${baseUrl}api/events/${id}`);
};


export default {
  create,
  getOne,
  getAll,
  updateEvent,
  deleteEvent,
};
