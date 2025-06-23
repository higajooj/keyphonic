import { Prisma, Product } from 'generated/prisma';
import { IPrismaRepository } from 'src/domains/abstration/repository/prisma/IRepository';

export abstract class IProductRepository extends IPrismaRepository<
  Prisma.ProductFindFirstArgs,
  Prisma.ProductWhereUniqueInput,
  Prisma.ProductCreateInput,
  Prisma.ProductUpdateInput,
  Product
> {}
