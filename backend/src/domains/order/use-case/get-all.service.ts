import { Injectable } from '@nestjs/common';
import { PaymentMethodEnum } from 'generated/prisma';
import { IOrderRepository } from '../interfaces/order.interface';
import {
  BasePaginationInputDTO,
  BasePaginationOutputDTO,
} from 'src/shared/dto/pagination.dto';
import { IOrder } from '../order.domain';
import { makePagination } from 'src/shared/utils/make-pagination';

export class GetAllOrderServiceInput extends BasePaginationInputDTO {
  filter?: {
    search?: string;
    paymentMethod?: PaymentMethodEnum;
  };
}

export class GetAllOrderServiceOutput extends BasePaginationOutputDTO {
  data: IOrder[];
}

@Injectable()
export class GetAllOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute({
    filter,
    pagination,
  }: GetAllOrderServiceInput): Promise<GetAllOrderServiceOutput> {
    const where: any = {};

    if (filter?.paymentMethod) {
      where.paymentMethod = filter.paymentMethod;
    }

    if (filter?.search) {
      const match = { contains: filter.search, mode: 'insensitive' };
      where.OR = [
        { address: { city: match } },
        { address: { neighborhood: match } },
        { address: { state: match } },
        { address: { street: match } },
        { OrderItem: { some: { product: { name: match } } } },
        { OrderItem: { some: { product: { description: match } } } },
      ];
    }

    const orders = await this.orderRepository.findAll({
      where,
      include: {
        OrderItem: true,
        address: true,
      },
      ...makePagination(pagination),
    });

    const total = await this.orderRepository.count({ where });

    return {
      data: orders,
      pagination: {
        ...pagination,
        total,
      },
    };
  }
}
