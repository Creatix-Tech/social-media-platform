import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ServiceConfig } from './common/services/config.service';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ServiceConfig);
    const logger: Logger = new Logger('main');

    app.enableCors();
    app.useLogger(logger);
    app.setGlobalPrefix(config.globalPrefix);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    setupSwagger(app, config);

    await app.listen(config.port);
    logger.log(`Server is running on port: ${config.port}`);
}
bootstrap();
