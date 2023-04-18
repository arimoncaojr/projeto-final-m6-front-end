import axios from "axios";
import { IUserCreatedRequest } from "../interfaces/user";

export const Api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});


// export const registerApi = async (data: IUserCreatedRequest) => {
  
//   const resp = await fetch("http://localhost:3000/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//   .then(resp => resp.json())
//   .catch(err => console.log(err.message))
  
//   return resp
// }
export const registerApi = async (data: IUserCreatedRequest) => {
  
  const resp = await Api.post("/users",data)
  
  return resp
}