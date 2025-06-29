import { Injectable } from "@nestjs/common";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { Prisma, Product } from "generated/prisma";
import { IProductRepository } from "../interfaces/product.interface";

@Injectable()
export class ProductRepository
  extends PrismaRepository<
    Prisma.ProductFindFirstArgs,
    Prisma.ProductWhereUniqueInput,
    Prisma.ProductCreateInput,
    Prisma.ProductUpdateInput,
    Product
  >
  implements IProductRepository
{
  constructor(private readonly repository: PrismaService) {
    super("product", repository);
  }
}
