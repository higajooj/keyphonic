import { httpClient } from "../httpClient";
import { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from "./types";

class AuthService {
  async login(input: LoginInput) {
    const { data } = await httpClient.post<LoginResponse>("auth/login", input).catch((e) => {
      console.log("service: ", e?.response?.data || e);
      throw e?.response?.data || e;
    });

    return data;
  }

  async register(input: RegisterInput) {
    const { data } = await httpClient.post<RegisterResponse>("auth/register", input).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
