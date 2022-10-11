import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
        }),
    );

    const swaggerDocBuilder = new DocumentBuilder().setTitle('Orderbook docs').setDescription('test task for sfxdx').build();

    const document = SwaggerModule.createDocument(app, swaggerDocBuilder);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
