import { Prisma, User } from "generated/prisma";
import { IPrismaRepository } from "src/domains/abstration/repository/prisma/IRepository";

export abstract class IUserRepository extends IPrismaRepository<
  Prisma.UserFindFirstArgs,
  Prisma.UserWhereUniqueInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  User
> {}
