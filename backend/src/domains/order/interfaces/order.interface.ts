import { Prisma, Order } from "generated/prisma";
import { IPrismaRepository } from "src/domains/abstration/repository/prisma/IRepository";

export abstract class IOrderRepository extends IPrismaRepository<
  Prisma.OrderFindFirstArgs,
  Prisma.OrderWhereUniqueInput,
  Prisma.OrderCreateInput,
  Prisma.OrderUpdateInput,
  Order
> {
  abstract findByUnique(unique: Prisma.OrderWhereUniqueInput, include?: Prisma.OrderInclude): Promise<Order | void>;
}
