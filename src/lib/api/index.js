import axios from "axios";

import { fetchAllBlogs } from "./blogs";
import { loginApi, signup } from "./auth";
import { backendUrl } from "../constants";

const apiClient = axios.create({
  baseURL: backendUrl,
});

export default apiClient;
export { fetchAllBlogs };
export { loginApi, signup };
