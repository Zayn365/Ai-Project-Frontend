import axios from "axios";
const local = "http://localhost:5000";

export const Axios = axios.create({
  baseURL: local,
});
