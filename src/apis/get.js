import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(
  async (config) => {
    if (config.url.includes("register" || "login")) {
      console.log(config)
    }
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getAllData = () => {
  return axios
  .get(`${baseUrl}/user`)
  .then((response) => response.data)
}

export const getDataById = (id) => {
  return axios
  .get(`${baseUrl}/user/${id}`)
  .then((response) => response.data)
}