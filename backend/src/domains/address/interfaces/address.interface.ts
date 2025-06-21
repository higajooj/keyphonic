import { Prisma, Address } from 'generated/prisma';
import { IPrismaRepository } from 'src/domains/abstration/repository/prisma/IRepository';

export abstract class IAddressRepository extends IPrismaRepository<
  Prisma.AddressFindFirstArgs,
  Prisma.AddressWhereUniqueInput,
  Prisma.AddressCreateInput,
  Prisma.AddressUpdateInput,
  Address
> {}
