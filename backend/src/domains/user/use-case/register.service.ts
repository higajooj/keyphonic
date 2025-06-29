import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';
import { ICryptographyProvider } from 'src/shared/providers/cryptography';
import { IUserRepository } from '../interfaces/user.interface';
import { UserDomain } from '../user.domain';
import { LoginService, LoginServiceOutput } from './login.service';

export type RegisterServiceInput = {
  name: string;
  password: string;
  email: string;
};

export type RegisterServiceOutput = LoginServiceOutput;

@Injectable()
export class RegisterService {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly userRepository: IUserRepository,
    private readonly loginService: LoginService,
  ) {}

  public async execute(
    input: RegisterServiceInput,
  ): Promise<RegisterServiceOutput> {
    const domain = new UserDomain({ ...input, isActive: true });
    const [user] = await this.userRepository.findAll({
      where: { email: domain.email },
    });

    if (user)
      throw new ForbiddenException(
        'Usuário já cadastrado, verifique o cpf ou email',
      );

    await this.userRepository.create({
      ...domain,
      password: await this.cryptographyProvider.encrypt({
        password: domain.password,
      }),
    });

    return this.loginService.execute({
      email: domain.email,
      password: domain.password,
    });
  }
}
