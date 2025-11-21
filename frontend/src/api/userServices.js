import axios from "axios";

const baseUrl = "http://localhost:8080/";

const create = (form) => {
  return axios.post(`${baseUrl}api/users`, form);
};

export default {
  create,
};
