import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';
import { Inject, Injectable } from '@nestjs/common';
import { ITokenProvider } from '../interface/ITokenProvider';
import { JWTGateway } from '../gateways/jwt.gateway';
import { DecodeInput, DecodeOutput } from '../types/decode';
import { SingInput } from '../types/sing';

@Injectable()
export class TokenProvider implements ITokenProvider {
  private _provider: JWTGateway;

  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly JWTGateway: JWTGateway,
  ) {
    const provider = {
      jwt: this.JWTGateway,
    };

    this._provider = provider[config.app.driver.tokenDriver];
  }

  decode(data: DecodeInput): Promise<DecodeOutput> {
    return this._provider.decode(data);
  }

  sign(data: SingInput): Promise<string> {
    return this._provider.sign(data);
  }
}
