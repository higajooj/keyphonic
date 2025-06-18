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

    // implementa um rawbody para as chamadas do webhook
    // de onboarding da qitech
    app.use((req, _res, next) => {
      // Cria o rawBody antes do parser
      let data = '';
      // se tem content-type passa reto
      if (req.headers['content-type']) {
        return next();
      }

      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        req.rawBody = data;
        req.body = data;
        next();
      });
    });

    await app.listen(process.env.PORT || 3333, null, async () =>
      console.log(`listening on port: ${await app.getUrl()}`),
    );
  });
}
bootstrap();
