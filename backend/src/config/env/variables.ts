import { registerAs } from "@nestjs/config";

export const EnvironmentVariables = registerAs("config", () => {
  return {
    environment: process.env.NODE_ENV,
    app: {
      driver: {
        tokenDriver: process.env.TOKEN_DRIVER,
        cryptographyDriver: process.env.CRYPTOGRAPHY_DRIVER,
      },
      frontWebUrl: process.env.FRONT_WEB_URL,
      serverUrl: process.env.SERVER_URL,
      port: process.env.PORT,
    },
    database: {
      uri: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
});
