import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { IUserRepository } from './interfaces/user.interface';
import { UserRepository } from './repository/user.repository';
import { RegisterService } from './use-case/register.service';
import { LoginService } from './use-case/login.service';
import { CryptographyModule } from 'src/shared/providers/cryptography';
import { TokenModule } from 'src/shared/providers/token';

@Module({
  imports: [CryptographyModule, TokenModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: IUserRepository, useClass: UserRepository },
    RegisterService,
    LoginService,
  ],
})
export class UserModule {}
