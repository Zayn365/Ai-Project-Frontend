import axios from "axios";
const local = "http://localhost:5000";
const live = "https://ai-project-backend-rho.vercel.app";
const ec2 = "https://54.158.0.210.nip.io";
export const Axios = axios.create({
  baseURL: local,
});
