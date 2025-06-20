import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  NestFactory.create(AppModule, { cors: true }).then(async (app) => {
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ limit: '10mb', extended: true }));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.listen(process.env.PORT || 3333, null, async () =>
      console.log(`listening on port: ${await app.getUrl()}`),
    );
  });
}
bootstrap();
