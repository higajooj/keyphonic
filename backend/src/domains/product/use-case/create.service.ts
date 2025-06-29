import { Injectable } from "@nestjs/common";
import { CategoryEnum } from "generated/prisma";
import { IProductRepository } from "../interfaces/product.interface";
import { IProduct, ProductDomain } from "../product.domain";

export type CreateServiceInput = {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: CategoryEnum;
};

export type CreateServiceOutput = IProduct;

@Injectable()
export class CreateService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(input: CreateServiceInput): Promise<CreateServiceOutput> {
    const domain = new ProductDomain(input);
    const product = await this.productRepository.create({
      ...domain,
    });

    return product;
  }
}
