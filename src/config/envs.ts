import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  // PRODUCTOS_MICROSERVICE_HOST: string;
  // PRODUCTOS_MICROSERVICE_PORT: number;
  NATS_SERVERS: string[];
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    // PRODUCTOS_MICROSERVICE_HOST: joi.string().required(),
    // PRODUCTOS_MICROSERVICE_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  // productosMicroserviceHost: envVars.PRODUCTOS_MICROSERVICE_HOST,
  // productosMicroservicePort: envVars.PRODUCTOS_MICROSERVICE_PORT,
  natsServer: envVars.NATS_SERVERS,
};
