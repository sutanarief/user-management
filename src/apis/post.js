import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL


export const userRegister = (payload) => {
  return axios
  .post(`${baseUrl}/auth/register`, payload)
  .then((response) => response)
}

export const userLogin = (payload) => {
  return axios
  .post(`${baseUrl}/auth/login`, payload)
  .then((response => response))
}