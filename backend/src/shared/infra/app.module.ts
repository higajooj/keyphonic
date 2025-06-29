import { Module } from "@nestjs/common";
import { modules } from "./modules";
import { providers } from "./providers";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentVariables, EnvironmentVariablesSchema } from "src/config/env";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "../guards/jwt.guard";

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
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    ...providers,
  ],
})
export class AppModule {}
