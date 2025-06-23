import { BadRequestException } from '@nestjs/common';
import { CategoryEnum } from 'generated/prisma';
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
  }

  delete() {
    this.isActive = false;
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
