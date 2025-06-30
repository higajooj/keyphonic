import * as Joi from "joi";

export const EnvironmentVariablesSchema = Joi.object({
  NODE_ENV: Joi.string().valid("staging", "production").default("staging"),
  FRONT_WEB_URL: Joi.string().required(),
  SERVER_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  TOKEN_DRIVER: Joi.string().required(),
  CRYPTOGRAPHY_DRIVER: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
