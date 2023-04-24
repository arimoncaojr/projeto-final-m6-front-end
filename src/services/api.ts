import axios from "axios";
import { Ilogin } from "../interfaces/login";
import { IUserCreatedRequest } from "../interfaces/user";

export const Api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

export const registerApi = async (data: IUserCreatedRequest) => {
  
  const resp = await Api.post("/users",data)
  return resp
}

export const getProfileUser = async (token: string) => { 
  const resp = await Api.get("/users/profile", {
    headers: {
       Authorization: `Bearer ${token}`
     }
  })
  return resp
}


export const loginApi = async (data: Ilogin) => {
  const resp = await Api.post("/login",data)
  return resp
}