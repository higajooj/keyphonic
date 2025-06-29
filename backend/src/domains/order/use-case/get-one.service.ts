import { Injectable, NotFoundException } from "@nestjs/common";
import { IOrder } from "../order.domain";
import { IOrderRepository } from "../interfaces/order.interface";

export type GetOneOrderServiceInput = {
  id: string;
};

export type GetOneOrderServiceOutput = IOrder;

@Injectable()
export class GetOneOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute(input: GetOneOrderServiceInput): Promise<GetOneOrderServiceOutput> {
    const order = await this.orderRepository.findByUnique(
      // where
      {
        id: input.id,
      },
      // include
      {
        OrderItem: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    );

    if (!order) {
      throw new NotFoundException(`Pedido com id ${input.id} não encontrado`);
    }

    return order;
  }
}
