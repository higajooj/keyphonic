import { Module } from '@nestjs/common';
import {  ProductController } from './controllers/product.controller';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { IProductRepository } from './interfaces/product.interface';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    { provide: IProductRepository, useClass: ProductRepository },
  ],
})
export class ProductModule {}
