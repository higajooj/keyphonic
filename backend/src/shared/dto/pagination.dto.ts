import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class PaginationRequestDTO {
  @IsOptional()
  @Type(() => Number)
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsString()
  @IsOptional()
  sort?: string = "createdAt";

  @IsOptional()
  order?: "1" | "-1" = "-1";
}

export class PaginationInput {
  skip?: number;
  limit?: number;
  sort?: string;
  order?: "-1" | "1";
}

export class BasePaginationInputDTO {
  pagination?: PaginationInput;
}

export class BasePaginationOutputDTO {
  pagination: {
    skip?: number;
    limit?: number;
    total?: number;
    sort?: string;
    order?: string;
  };
}
