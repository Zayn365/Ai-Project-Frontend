import axios from "axios";
const local = "http://localhost:5000";
const live = "https://ai-project-backend-rho.vercel.app";
export const Axios = axios.create({
  baseURL: live,
});
