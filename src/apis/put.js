import axios from "axios";


const baseUrl = process.env.REACT_APP_BASE_URL

export const editUser = (id, payload) => {
  return axios
  .put(`${baseUrl}/user/${id}`, payload)
  .then((response) => response)
}