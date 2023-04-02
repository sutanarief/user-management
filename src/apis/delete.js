import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL


export const deleteUser = (id) => {
  return axios
  .delete(`${baseUrl}/user/${id}`)
  .then((response) => response)
}