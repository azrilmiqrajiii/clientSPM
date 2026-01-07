import axios from "axios";

const API = axios.create({
  baseURL: "https://backendspm-production.up.railway.app/api",
});

export default API;
