import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CategoryEnum } from "generated/prisma";

export class UpdateProductBody {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsNumber()
  @IsOptional()
  qtd?: number;

  @IsEnum(CategoryEnum)
  @IsOptional()
  category?: CategoryEnum;
}
