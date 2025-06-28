import { localStorageKeys } from "@/config/localStorageKeys";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});


httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
