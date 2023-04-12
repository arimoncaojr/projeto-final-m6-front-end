import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  timeout: 5000,
});

export const getAddress = async (cep:string) => {
  const address = await baseURL.get(`${cep}/json/`)
  return address
}
