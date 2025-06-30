import { Module } from "@nestjs/common";
import { PrismaService } from "src/shared/infra/prisma/prisma.service";
import { IOrderItemRepository } from "../order-item/interfaces/order-item.interface";
import { OrderItemRepository } from "../order-item/repository/order-item.repository";
import { IProductRepository } from "../product/interfaces/product.interface";
import { ProductRepository } from "../product/repository/product.repository";
import { OrderController } from "./controllers/order.controller";
import { IOrderRepository } from "./interfaces/order.interface";
import { OrderRepository } from "./repository/order.repository";
import { CreateService } from "./use-case/create.service";
import { GetAllOrderService } from "./use-case/get-all.service";
import { GetOneOrderService } from "./use-case/get-one.service";
import { GetStatsService } from "./use-case/get-stats.service";
import { UpdateOrderService } from "./use-case/update.service";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    PrismaService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: IOrderItemRepository, useClass: OrderItemRepository },
    { provide: IProductRepository, useClass: ProductRepository },
    CreateService,
    GetOneOrderService,
    GetAllOrderService,
    UpdateOrderService,
    GetStatsService,
  ],
})
export class OrderModule {}
