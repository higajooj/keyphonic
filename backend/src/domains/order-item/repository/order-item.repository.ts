import { Injectable } from "@nestjs/common";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { Prisma, OrderItem } from "generated/prisma";
import { IOrderItemRepository } from "../interfaces/order-item.interface";

@Injectable()
export class OrderItemRepository
  extends PrismaRepository<
    Prisma.OrderItemFindFirstArgs,
    Prisma.OrderItemWhereUniqueInput,
    Prisma.OrderItemCreateInput,
    Prisma.OrderItemUpdateInput,
    OrderItem
  >
  implements IOrderItemRepository
{
  constructor(private readonly repository: PrismaService) {
    super("orderItem", repository);
  }

  async createMany(data?: Prisma.OrderItemCreateManyInput | Prisma.OrderItemCreateManyInput[]): Promise<OrderItem[]> {
    return await this.repository.orderItem.createManyAndReturn({ data });
  }
}
