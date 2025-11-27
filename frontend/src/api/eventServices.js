import axios from "axios";

const baseUrl = "http://localhost:8080/";

const create = (event) => {
  return axios.post(`${baseUrl}api/events`, event);
};
const getOne = (id) => {
  return axios.get(`${baseUrl}api/events/${id}`);
};
const getAll = () => {
  return axios.get(`${baseUrl}api/events`);
};
const updateEvent = (id, event) => {
  return axios.patch(`${baseUrl}api/events/${id}`, event);
};
const deleteEvent = (id) => {
  return axios.delete(`${baseUrl}api/events/${id}`);
};
const ingest = (adminEmail) => {
  return axios.post(`${baseUrl}api/events/ingest`, adminEmail);
};

export default {
  create,
  getOne,
  getAll,
  updateEvent,
  deleteEvent,
  ingest,
};
