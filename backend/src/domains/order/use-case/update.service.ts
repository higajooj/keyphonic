import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderDomain, IOrder } from "../order.domain";
import { IOrderRepository } from "../interfaces/order.interface";
import { PaymentMethodEnum } from "generated/prisma";

export type UpdateOrderServiceInput = {
  id: string;
  addressId?: string;
  paymentMethod?: PaymentMethodEnum;
  delivery_fee?: number;
};

export type UpdateOrderServiceOutput = IOrder;

@Injectable()
export class UpdateOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute({ id, ...input }: UpdateOrderServiceInput): Promise<UpdateOrderServiceOutput> {
    const order = await this.orderRepository.findByUnique({ id });

    if (!order) {
      throw new NotFoundException(`Pedido com id: ${id} não encontrado`);
    }

    const domain = new OrderDomain(order);

    domain.update({
      paymentMethod: input.paymentMethod,
    });

    const updatedOrder = await this.orderRepository.update({ id }, domain);

    if (!updatedOrder) {
      throw new InternalServerErrorException(`Não foi possível atualizar o pedido com id: ${id}`);
    }

    return updatedOrder;
  }
}
