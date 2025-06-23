import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethodEnum } from 'generated/prisma';
import { PaginationRequestDTO } from 'src/shared/dto/pagination.dto';

export class GetAllOrdersRequestDTO extends PaginationRequestDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  category?: PaymentMethodEnum;
}
