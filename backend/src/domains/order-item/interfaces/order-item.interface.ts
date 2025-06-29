import { Prisma, OrderItem } from "generated/prisma";
import { IPrismaRepository } from "src/domains/abstration/repository/prisma/IRepository";

export abstract class IOrderItemRepository extends IPrismaRepository<
  Prisma.OrderItemFindFirstArgs,
  Prisma.OrderItemWhereUniqueInput,
  Prisma.OrderItemCreateInput,
  Prisma.OrderItemUpdateInput,
  OrderItem
> {
  abstract createMany(data?: Prisma.OrderItemCreateManyInput | Prisma.OrderItemCreateManyInput[]): Promise<OrderItem[]>;
}
