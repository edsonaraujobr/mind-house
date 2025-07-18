import { env } from 'modules/common/env';
import { HttpExceptionFilter } from 'modules/common/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Migos API')
      .setDescription('Documentação da API com Swagger')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.listen(env.PORT_SERVER);
    console.log(`App rodando em: http://localhost:${env.PORT_SERVER}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
