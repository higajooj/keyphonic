import { Injectable } from '@nestjs/common';
import { CategoryEnum, Product } from 'generated/prisma';
import { IProductRepository } from '../interfaces/product.interface';
import { ProductDomain } from '../product.domain';

export type CreateServiceInput = {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: CategoryEnum;
};

export type CreateServiceOutput = ProductDomain;

@Injectable()
export class CreateService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    input: CreateServiceInput,
  ): Promise<CreateServiceOutput> {
    return;
  }
}
