import { IsEnum, IsOptional, IsString } from "class-validator";
import { CategoryEnum } from "generated/prisma";
import { PaginationRequestDTO } from "src/shared/dto/pagination.dto";

export class GetAllProductsRequestDTO extends PaginationRequestDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CategoryEnum)
  category?: CategoryEnum;
}
