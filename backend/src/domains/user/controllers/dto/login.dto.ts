import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseDTO {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
}
