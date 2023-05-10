import axios from "axios";
import { Ilogin } from "../interfaces/login";
import { IResetPasswordRequest, IUserCreatedRequest } from "../interfaces/user";

export const Api = axios.create({
  baseURL: "https://kenzie-kars-19.onrender.com",
  timeout: 5000,
});

export const registerApi = async (data: IUserCreatedRequest) => {
  const resp = await Api.post("/users", data);
  return resp;
};

export const getProfileUser = async (token: string) => {
  const resp = await Api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp;
};

export const loginApi = async (data: Ilogin) => {
  const resp = await Api.post("/login", data);
  return resp;
};

export const accessAuthenticationTokenSendEmail = async (token: any) => {
  const resp = await Api.get(`/users/authentication/${token}`);
  return resp;
};

export const resetPasswordUser = async (
  token: string | undefined,
  data: IResetPasswordRequest
) => {
  console.log(data);
  const resp = await Api.post(`/users/reset/${token}`, data);
  // const resp = await fetch(`http://localhost:3000/users/reset/${token}`, {
  //     headers: {'Content-Type': 'application/json'},
  //     method: 'POST',
  //     body: JSON.stringify(data)
  //   })
  //   .then(resp => resp.json())
  //   .then(resp => resp)
  //   .catch(err => console.error(err))

  return resp;
};
