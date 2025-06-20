import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryEnum } from 'generated/prisma';
import { IProductRepository } from '../interfaces/product.interface';
import { IProduct, ProductDomain } from '../product.domain';

export type UpdateServiceInput = {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  qtd?: number;
  category?: CategoryEnum;
};

export type UpdateServiceOutput = IProduct;

@Injectable()
export class UpdateService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute({
    id,
    ...input
  }: UpdateServiceInput): Promise<UpdateServiceOutput> {
    const product = await this.productRepository.findByUnique({
      id,
    });
    if (!product)
      throw new NotFoundException(`Produto de id: ${id}, não encontrado`);

    const domain = new ProductDomain(product);

    domain.update(input);

    const updateProduct = await this.productRepository.update({ id }, domain);
    if (!updateProduct)
      throw new InternalServerErrorException(
        `Não foi possivel atualizar o produto de id: ${id}`,
      );

    return updateProduct;
  }
}
