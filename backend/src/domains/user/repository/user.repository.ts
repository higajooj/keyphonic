import { Injectable } from "@nestjs/common";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { IUserRepository } from "../interfaces/user.interface";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { Prisma, User } from "generated/prisma";

@Injectable()
export class UserRepository
  extends PrismaRepository<
    Prisma.UserFindFirstArgs,
    Prisma.UserWhereUniqueInput,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    User
  >
  implements IUserRepository
{
  constructor(private readonly repository: PrismaService) {
    super("user", repository);
  }
}
