import { Injectable } from "@nestjs/common";
import { CategoryEnum } from "generated/prisma";
import { IProductRepository } from "../interfaces/product.interface";
import { BasePaginationInputDTO, BasePaginationOutputDTO } from "src/shared/dto/pagination.dto";
import { IProduct } from "../product.domain";
import { makePagination } from "src/shared/utils/make-pagination";

export class GetAllServiceInput extends BasePaginationInputDTO {
  filter?: {
    search?: string;
    category?: CategoryEnum;
  };
}

export class GetAllServiceOutput extends BasePaginationOutputDTO {
  data: IProduct[];
}

@Injectable()
export class GetAllService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute({ filter, pagination }: GetAllServiceInput): Promise<GetAllServiceOutput> {
    const where: any = { isActive: true };

    if (filter?.category) where.category = filter.category;
    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search, mode: "insensitive" } },
        { description: { contains: filter.search, mode: "insensitive" } },
      ];
    }

    const products = await this.productRepository.findAll({
      where,
      ...makePagination(pagination),
    });

    const total = await this.productRepository.count({ where });

    return {
      data: products,
      pagination: {
        ...pagination,
        total,
      },
    };
  }
}
