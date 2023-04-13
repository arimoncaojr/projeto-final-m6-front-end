import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://localhost:3000",
  timeout: 5000,
});