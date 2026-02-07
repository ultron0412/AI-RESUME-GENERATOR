import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateResume = (data) =>
  API.post("/resume/generate", data);
