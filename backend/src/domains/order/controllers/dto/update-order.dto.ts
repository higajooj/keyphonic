import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethodEnum } from 'generated/prisma';

export class UpdateOrderBody {
  @IsOptional()
  @IsString()
  addressId?: string;

  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;

  @IsOptional()
  @IsNumber()
  delivery_fee?: number;
}
