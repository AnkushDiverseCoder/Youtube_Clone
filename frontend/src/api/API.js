import axios from "axios";

const baseUrl = "https://busy-jade-lemming-hat.cyclic.app/api"
// const baseUrl = "http://localhost:8000/api"

const api = axios.create({
  baseURL: baseUrl,
});

export default api;