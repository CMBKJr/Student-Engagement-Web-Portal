import axios from "axios";

const baseUrl = "http://localhost:8080/";

const getMilestones = () => {
  return axios.get(`${baseUrl}api/milestone`);
};

export default {
  getMilestones,
};
