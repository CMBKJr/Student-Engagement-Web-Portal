import axios from "axios";

const baseUrl = "http://localhost:8080/";

const getMilestones = () => axios.get(`${baseUrl}api/milestone`);

const createMilestone = (data) => axios.post(`${baseUrl}api/milestone`, data);

const updateMilestone = (id, data) =>
  axios.patch(`${baseUrl}api/milestone/${id}`, data);

const deleteMilestone = (id) => axios.delete(`${baseUrl}api/milestone/${id}`);

const getCompletedMilestones = (userId) => {
  return axios.post(`${baseUrl}api/milestone/get-completed`, {userId});
};

export default {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getCompletedMilestones
};
