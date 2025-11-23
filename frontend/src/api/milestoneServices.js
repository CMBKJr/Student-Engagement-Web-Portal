import axios from "axios";

const baseUrl = "http://localhost:8080/";

const getMilestones = () => {
  return axios.get(`${baseUrl}api/milestone`);
};

const getCompletedMilestones = (userId) => {
  return axios.post(`${baseUrl}api/milestone/get-completed`, {userId});
};

export default {
  getMilestones,
  getCompletedMilestones
};
