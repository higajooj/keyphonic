import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderDomain, IOrder } from '../order.domain';
import { IOrderRepository } from '../interfaces/order.interface';
import { PaymentMethodEnum } from 'generated/prisma';
import { IProductRepository } from 'src/domains/product/interfaces/product.interface';
import { IProduct, ProductDomain } from 'src/domains/product/product.domain';
import { IOrderItemRepository } from 'src/domains/order-item/interfaces/order-item.interface';

export type ItemsInput = { productId: string; quantity: number };

export type CreateServiceInput = {
  addressId: string;
  paymentMethod: PaymentMethodEnum;
  items: ItemsInput[];
  delivery_fee?: number;
};

export type CreateServiceOutput = IOrder;

@Injectable()
export class CreateService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly productsRepository: IProductRepository,
  ) {}

  public async execute({
    items,
    ...input
  }: CreateServiceInput): Promise<CreateServiceOutput> {
    if (!items || items.length === 0) {
      throw new BadRequestException('Items are required to create an order');
    }
    const products = await this.loadProducts(items.map((i) => i.productId));

    const domain = new OrderDomain(input);

    domain.calculateOrderTotal(products, items);
    domain.calculateProductsQtd(products, items);

    await this.updateProductsStock(products, items);

    const order = await this.orderRepository.create({
      ...domain,
      address: { connect: { id: input.addressId } },
    });

    await this.createOrderItems(order.id, products, items);
    return order;
  }

  private async loadProducts(productIds: string[]) {
    const products = await this.productsRepository.findAll({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    return products;
  }

  private async createOrderItems(
    orderId: string,
    products: IProduct[],
    items: ItemsInput[],
  ): Promise<void> {
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      return {
        orderId,
        productId: product.id,
        price: product.price,
        qtd: item.quantity,
      };
    });

    await this.orderItemRepository.createMany(orderItems);
  }

  private async updateProductsStock(
    products: IProduct[],
    items: ItemsInput[],
  ): Promise<void> {
    const updates = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(
          `Produto ${item.productId} não encontrado`,
        );
      }

      const domain = new ProductDomain(product);

      domain.updateStock(item.quantity);

      return this.productsRepository.update({ id: product.id }, domain);
    });

    await Promise.all(updates);
  }
}
