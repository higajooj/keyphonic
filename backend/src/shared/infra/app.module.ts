import { Module } from '@nestjs/common';
import { modules } from './modules';
import { providers } from './providers';
import { ConfigModule } from '@nestjs/config';
import {
  EnvironmentVariables,
  EnvironmentVariablesSchema,
} from 'src/config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvironmentVariables],
      validationSchema: EnvironmentVariablesSchema,
    }),
    ...modules,
  ],
  controllers: [],
  providers: [...providers],
})
export class AppModule {}
