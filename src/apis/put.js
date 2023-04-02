import axios from "axios";


export const editUser = (id) => {
  return axios
  .put(`${baseUrl}/user/${id}`)
}