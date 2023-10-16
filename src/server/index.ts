import axios from "axios";

const request = axios.create({
  baseURL: "https://652d746df9afa8ef4b277735.mockapi.io/",
  timeout: 10000,
});

export default request;
