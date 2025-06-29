import { Injectable, NotFoundException } from "@nestjs/common";
import { IProductRepository } from "../interfaces/product.interface";
import { IProduct } from "../product.domain";

export type GetOneServiceInput = {
  id: string;
};

export type GetOneServiceOutput = IProduct;

@Injectable()
export class GetOneService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(input: GetOneServiceInput): Promise<GetOneServiceOutput> {
    const product = await this.productRepository.findByUnique(input);
    if (!product) throw new NotFoundException(`Produto de ${JSON.stringify(input)}, não encontrado`);

    return product;
  }
}
