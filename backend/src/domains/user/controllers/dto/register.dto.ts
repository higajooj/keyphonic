import { IsEmail, IsString } from "class-validator";
import { LoginResponseDTO } from "./login.dto";

export class RegisterDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterResponseDTO extends LoginResponseDTO {}
