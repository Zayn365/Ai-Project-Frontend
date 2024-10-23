import axios from "axios";
const local = "http://localhost:4000";
const live = "https://ai-project-backend-rho.vercel.app";
export const Axios = axios.create({
  baseURL: local,
});
