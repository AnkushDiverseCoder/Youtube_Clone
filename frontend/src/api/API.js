import axios from "axios";

const baseUrl = "https://tender-worm-fatigues.cyclic.app/api"

const api = axios.create({
  baseURL: baseUrl,
});

export default api;