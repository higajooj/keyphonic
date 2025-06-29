import { BadRequestException } from "@nestjs/common";
import { PaymentMethodEnum } from "generated/prisma";
import BaseDomain, { BaseDomainInterface } from "src/shared/domain/base-domain.domain";
import { IProduct } from "../product/product.domain";
import { ItemsInput } from "./use-case/create.service";

export type IOrder = {
  id: string;

  addressId: string;
  paymentMethod: PaymentMethodEnum;
  delivery_fee: number;
  total: number;
  qtd: number;

  createdAt: Date;
  updatedAt: Date;
};

type CreateOrderInput = {
  paymentMethod: PaymentMethodEnum;

  delivery_fee?: number;
  total?: number;
  qtd?: number;
} & BaseDomainInterface;

type UpdateOrderInput = Partial<Pick<IOrder, "paymentMethod">>;
export class OrderDomain extends BaseDomain {
  paymentMethod: PaymentMethodEnum;
  delivery_fee: number;
  total: number;
  qtd: number;

  constructor(props: CreateOrderInput) {
    super();
    this._validate(props);
    const payload = this._sanitize(props);

    this.paymentMethod = payload.paymentMethod;
    this.delivery_fee = payload.delivery_fee ?? 10;
    this.total = payload.total;
    this.qtd = payload.qtd;
  }

  update(input: UpdateOrderInput) {
    const payload = Object.assign({}, this);
    this._validate(Object.assign(payload, input));
    const sanitizedPayload = this._sanitize(Object.assign(payload, input));

    this.paymentMethod = sanitizedPayload.paymentMethod;
  }

  private _validate(input: CreateOrderInput) {
    if (input.id) return;

    if (!input.paymentMethod) {
      throw new BadRequestException("paymentMethod is required");
    }
  }

  private _sanitize(input: CreateOrderInput) {
    return {
      paymentMethod: input.paymentMethod,
      delivery_fee: Number(input.delivery_fee) || null,
      total: Number(input.total) || null,
      qtd: Number(input.qtd) || null,
    };
  }

  calculateProductsTotal(products: IProduct[], items: ItemsInput[]) {
    const total = items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      return acc + product.price * item.quantity;
    }, 0);

    return total;
  }

  calculateOrderTotal(products: IProduct[], items: ItemsInput[]) {
    this.total = this.calculateProductsTotal(products, items) + this.delivery_fee;
  }

  calculateProductsQtd(products: IProduct[], items: ItemsInput[]) {
    this.qtd = items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      return acc + item.quantity;
    }, 0);
  }
}
