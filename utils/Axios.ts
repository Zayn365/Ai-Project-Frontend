import axios from "axios";
const local = "http://localhost:5000";
const live = "https://ai-project-backend-rho.vercel.app";
const ec2 = "https://api.narrativemaster.com";
const nginx = "https://18.208.248.57";
export const Axios = axios.create({
  baseURL: ec2,
});
