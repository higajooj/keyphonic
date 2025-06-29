import { Module } from "@nestjs/common";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { ProductController } from "./controllers/product.controller";
import { IProductRepository } from "./interfaces/product.interface";
import { ProductRepository } from "./repository/product.repository";
import { CreateService } from "./use-case/create.service";
import { DeleteService } from "./use-case/delete.service";
import { GetAllService } from "./use-case/get-all.service";
import { GetOneService } from "./use-case/get-one.service";
import { UpdateService } from "./use-case/update.service";
import { UploadService } from "./use-case/upload.service";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    { provide: IProductRepository, useClass: ProductRepository },
    CreateService,
    GetOneService,
    GetAllService,
    UpdateService,
    DeleteService,
    UploadService,
  ],
})
export class ProductModule {}
