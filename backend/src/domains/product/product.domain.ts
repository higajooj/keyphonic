import { BadRequestException } from '@nestjs/common';
import { CategoryEnum, ProductStatusEnum, } from 'generated/prisma';
import BaseDomain, {
  BaseDomainInterface,
} from 'src/shared/domain/base-domain.domain';

export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: CategoryEnum;
  status: ProductStatusEnum;
  galery: string[] | null;
  createdAt: Date;
  updatedAt: Date;
};

type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: CategoryEnum;
  status?: ProductStatusEnum;
  isActive?: boolean;
} & BaseDomainInterface;

type UpdateProductInput = Partial<
  Pick<
    CreateProductInput,
    'name' | 'description' | 'price' | 'qtd' | 'category'
  >
>;
export class ProductDomain extends BaseDomain {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: CategoryEnum;
  status: ProductStatusEnum;
  isActive: boolean;

  constructor(props: CreateProductInput) {
    super();
    this._validate(props);
    const payload = this._sanitize(props);

    this.name = payload.name;
    this.description = payload.description;
    this.price = payload.price;
    this.qtd = payload.qtd;
    this.category = payload.category;
    this.isActive = payload.isActive;

    this._updateStatus();
  }

  update(input: UpdateProductInput) {
    const payload = Object.assign({}, this);
    this._validate(Object.assign(payload, input));
    const sanitizedPayload = this._sanitize(Object.assign(payload, input));

    this.name = sanitizedPayload.name;
    this.description = sanitizedPayload.description;
    this.price = sanitizedPayload.price;
    this.qtd = sanitizedPayload.qtd;
    this.category = sanitizedPayload.category;

    this._updateStatus();
  }

  delete() {
    this.isActive = false;
  }

  updateStock(quantity: number) {
    const newQtd = this.qtd - quantity;

    if (newQtd < 0) {
      throw new BadRequestException(
        `Estoque insuficiente para o produto "${this.name}"`,
      );
    }

    this.qtd = newQtd;
    this._updateStatus();
  }

  private _updateStatus() {
    if (this.qtd === 0) {
      this.status = ProductStatusEnum.EMPTY;
    } else if (this.qtd <= 20) {
      this.status = ProductStatusEnum.CRITIC;
    } else {
      this.status = ProductStatusEnum.FULL;
    }
  }

  private _validate(input: CreateProductInput) {
    if (input.id) return;
    if (!input.description || !input.name || !input.category || !input.price)
      throw new BadRequestException(
        'name, decription, category and price are required fields',
      );
  }

  private _sanitize(input: CreateProductInput) {
    return {
      name: input.name.trim().replace(/\s+/g, ' '),
      description: input.description.trim().replace(/\s+/g, ' '),
      price: input.price,
      qtd: input.qtd || 0,
      category: input.category,
      isActive: input.isActive !== undefined ? input.isActive : true,
    };
  }
}
