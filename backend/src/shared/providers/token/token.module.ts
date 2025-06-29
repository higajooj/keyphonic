import { Module } from "@nestjs/common";

import { ITokenProvider } from "./interface/ITokenProvider";
import { TokenProvider } from "./service/token.service";
import { JWTGateway } from "./gateways/jwt.gateway";

@Module({
  providers: [{ provide: ITokenProvider, useClass: TokenProvider }, JWTGateway],
  exports: [{ provide: ITokenProvider, useClass: TokenProvider }, JWTGateway],
})
export class TokenModule {}
