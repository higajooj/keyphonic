import { Injectable } from "@nestjs/common";
import { Address, Prisma } from "generated/prisma";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { IAddressRepository } from "../interfaces/address.interface";

@Injectable()
export class AddressRepository
  extends PrismaRepository<
    Prisma.AddressFindFirstArgs,
    Prisma.AddressWhereUniqueInput,
    Prisma.AddressCreateInput,
    Prisma.AddressUpdateInput,
    Address
  >
  implements IAddressRepository
{
  constructor(private readonly repository: PrismaService) {
    super("address", repository);
  }
}
