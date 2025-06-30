import { Injectable } from "@nestjs/common";
import { Prisma, User } from "generated/prisma";
import { PrismaRepository } from "src/domains/abstration/repository/prisma/Repository";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { IUserRepository } from "../interfaces/user.interface";

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
