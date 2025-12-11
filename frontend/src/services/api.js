
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 15000,
});


if (typeof window !== "undefined") {
  console.log("API baseURL =", baseURL);
}

export default API;
