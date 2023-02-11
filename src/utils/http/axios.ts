import axios from "axios";

export default axios.create({
  baseURL: "http://116.198.203.171:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
