import { Injectable } from "@nestjs/common";
import { Order, Prisma } from "generated/prisma";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { IOrderRepository } from "../interfaces/order.interface";

@Injectable()
export class OrderRepository
  extends PrismaRepository<
    Prisma.OrderFindFirstArgs,
    Prisma.OrderWhereUniqueInput,
    Prisma.OrderCreateInput,
    Prisma.OrderUpdateInput,
    Order
  >
  implements IOrderRepository
{
  constructor(private readonly repository: PrismaService) {
    super("order", repository);
  }

  async findByUnique(unique: Prisma.OrderWhereUniqueInput, include?: Prisma.OrderInclude): Promise<void | Order> {
    return await this.repository.order.findUnique({
      where: unique,
      include,
    });
  }
}
