import { Inject, Injectable } from '@nestjs/common';
import { sign as _sign, verify } from 'jsonwebtoken';
import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';
import { ITokenProvider } from '../interface/ITokenProvider';
import { DecodeInput, DecodeOutput } from '../types/decode';
import { SingInput, SingOutput } from '../types/sing';

@Injectable()
export class JWTGateway implements ITokenProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
  ) {}
  public async sign(data: SingInput): Promise<SingOutput> {
    return _sign(
      {
        id: data.id,
        email: data.email,
      },
      this.config.jwt.secret,
    );
  }

  public async decode(data: DecodeInput): Promise<DecodeOutput> {
    const decodeToken = verify(
      data.token,
      this.config.jwt.secret,
    ) as DecodeOutput;

    return decodeToken;
  }
}
