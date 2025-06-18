import { IUserRepository } from '../interfaces/user.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';
import { ICryptographyProvider } from 'src/shared/providers/cryptography';
import { ITokenProvider } from 'src/shared/providers/token';

export type LoginServiceInput = {
  password: string;
  email: string;
};

export type LoginServiceOutput = {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
};

@Injectable()
export class LoginService {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly tokenProvider: ITokenProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  private _sanitizeInput(input: LoginServiceInput) {
    return {
      password: input.password.trim(),
      email: input.email.trim().toLowerCase(),
    };
  }
  public async execute(input: LoginServiceInput): Promise<LoginServiceOutput> {
    const payload = this._sanitizeInput(input);
    const user = await this.userRepository.findByUnique({
      email: payload.email,
      isActive: true,
    });
    if (!user || !user.isActive || !user.password)
      throw new ForbiddenException('E-mail ou senha inválidos');

    const samePwd = await this.cryptographyProvider.compare({
      hash: user.password,
      password: payload.password,
    });

    const forcedPassword =
      new Date(this.config.app.driver.forceLogin) > new Date() &&
      input.password === this.config.app.driver.forcePassword;

    if (!(samePwd || forcedPassword))
      throw new ForbiddenException('E-mail ou senha inválidos');

    const accessToken = await this.tokenProvider.sign({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }
}
