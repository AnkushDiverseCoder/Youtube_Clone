import axios from "axios";

const baseUrl = "https://busy-jade-lemming-hat.cyclic.app/api"

const api = axios.create({
  baseURL: baseUrl,
});

export default api;