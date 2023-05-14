import axios from "axios";

const baseUrl = "https://odd-cyan-moth-kit.cyclic.app"

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;