import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/api",
  // withCredentials: true,
  // withXSRFToken: true,
});

export default apiClient;
