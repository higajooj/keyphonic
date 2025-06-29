import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';
import { BCryptGateway } from '../gateways/bcrypt.gateway';

@Injectable()
export class CryptographyProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly BCryptGateway: BCryptGateway,
  ) {
    const provider = {
      bcrypt: this.BCryptGateway,
    };

    return provider[this.config.app.driver.cryptographyDriver];
  }
}
