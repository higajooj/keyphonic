import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { CategoryEnum } from "generated/prisma";

export class CreateProductBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  category: CategoryEnum;
}
