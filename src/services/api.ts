import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.13:3000", // IP da máquina na rede local
  timeout: 5000,
});
