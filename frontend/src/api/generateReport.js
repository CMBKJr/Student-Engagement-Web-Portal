import axios from "axios";


const baseUrl = 'http://localhost:8080/'

const getReport = (id) => {
  return axios.get(`${baseUrl}api/participate/generateReport`);
};

export default {
  getReport
}