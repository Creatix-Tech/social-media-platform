import 'dotenv/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceConfig {
  globalPrefix: string = process.env.APP_GLOBAL_PREFIX;
  port: number = parseInt(process.env.APP_PORT);

  jwtSecret: string = process.env.JWT_SECRET;
  jwtExpiresIn: number = parseInt(process.env.JWT_EXPIRES_IN);

  dbURI: string = process.env.DB_URI;

  swagger = {
    name: process.env.SWAGGER_NAME,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    path: process.env.SWAGGER_PATH,
  };
}
