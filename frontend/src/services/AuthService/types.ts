export interface LoginInput {
  email: string;
  password: string;
}
export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
};

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type RegisterResponse = LoginResponse;
