import axios from "axios";

export const Api = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/",
  timeout: 20000,
});
