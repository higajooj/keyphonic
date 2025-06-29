import { IsOptional, IsString } from "class-validator";

export class UpdateAddressBody {
  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  zip_code: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;
}
