import { Injectable, NotFoundException } from "@nestjs/common";
import { IProductRepository } from "../interfaces/product.interface";
import { ProductDomain } from "../product.domain";

export type DeleteServiceInput = {
  id: string;
};

export type DeleteServiceOutput = { succes: true };

@Injectable()
export class DeleteService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute({ id }: DeleteServiceInput): Promise<DeleteServiceOutput> {
    const product = await this.productRepository.findByUnique({
      id,
    });
    if (!product) throw new NotFoundException(`Produto de id: ${id}, não encontrado`);

    const domain = new ProductDomain(product);

    domain.delete();

    await this.productRepository.update({ id }, domain);

    return { succes: true };
  }
}
