import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../interfaces/product.interface';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

export type UploadServiceInput = {
  productId: string;
  file: Express.Multer.File;
};

export type UploadServiceOutput = { url: string };

@Injectable()
export class UploadService {
  private readonly uploadFolder = path.resolve(
    __dirname,
    '../../../../uploads/products',
  );

  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    input: UploadServiceInput,
  ): Promise<UploadServiceOutput> {
    const product = await this.productRepository.findByUnique({
      id: input.productId,
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com id ${input.productId} não encontrado`,
      );
    }

    if (!fs.existsSync(this.uploadFolder)) {
      fs.mkdirSync(this.uploadFolder, { recursive: true });
    }

    const extension = path.extname(input.file.originalname);
    const filename = `${randomUUID()}${extension}`;
    const filepath = path.join(this.uploadFolder, filename);

    fs.writeFileSync(filepath, input.file.buffer);

    const imageUrl = `/uploads/products/${filename}`;

    await this.productRepository.update(
      { id: product.id },
      { galery: { push: imageUrl } },
    );

    return { url: imageUrl };
  }
}
