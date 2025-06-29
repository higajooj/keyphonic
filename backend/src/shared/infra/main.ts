import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { json, urlencoded } from "body-parser";
import * as path from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  NestFactory.create<NestExpressApplication>(AppModule, { cors: true }).then(async (app) => {
    app.use(json({ limit: "10mb" }));
    app.use(urlencoded({ limit: "10mb", extended: true }));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.useStaticAssets(path.join(__dirname, "../../../", "uploads"), {
      prefix: "/uploads/",
    });

    await app.listen(process.env.PORT || 3333, null, async () =>
      console.log(`listening on port: ${await app.getUrl()}`),
    );
  });
}
bootstrap();
