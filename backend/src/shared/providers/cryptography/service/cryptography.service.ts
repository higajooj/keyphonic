import { Inject, Injectable } from '@nestjs/common';

import { BCryptGateway } from '../gateways/bcrypt.gateway';
import { EnvironmentVariables, EnvironmentVariablesType } from 'src/config/env';

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
