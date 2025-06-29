import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { EnvironmentVariables, EnvironmentVariablesSchema } from "src/config/env";
import { JwtGuard } from "../guards/jwt.guard";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { modules } from "./modules";
import { providers } from "./providers";

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
