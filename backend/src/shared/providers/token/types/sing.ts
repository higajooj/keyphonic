export type SingInput = {
  id?: string;
  name?: string;
  email: string;
  jwtExpiresIn?: string;
  jwtSecret?: string;
};

export type SingOutput = string;
