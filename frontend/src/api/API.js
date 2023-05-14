import axios from "axios";

const baseUrl = "https://odd-cyan-moth-kit.cyclic.app/api"

const api = axios.create({
  baseURL: baseUrl,
});

export default api;