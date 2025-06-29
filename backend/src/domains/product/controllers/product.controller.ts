import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowPublicAccess } from 'src/shared/decorators/allow-public-access.decorator';
import { IdParams } from 'src/shared/dto/id-param.dto';
import { imageFileFilter } from 'src/shared/utils/image-upload-utils';
import { CreateService } from '../use-case/create.service';
import { DeleteService } from '../use-case/delete.service';
import { GetAllService } from '../use-case/get-all.service';
import { GetOneService } from '../use-case/get-one.service';
import { UpdateService } from '../use-case/update.service';
import { UploadService } from '../use-case/upload.service';
import { CreateProductBody } from './dto/create-product.dto';
import { GetAllProductsRequestDTO } from './dto/get-all-products.dto';
import { UpdateProductBody } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createService: CreateService,
    private readonly getOneService: GetOneService,
    private readonly getAllService: GetAllService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('')
  createProduct(@Body() input: CreateProductBody): Promise<any> {
    return this.createService.execute(input);
  }

  @Get('')
  @AllowPublicAccess()
  getProducts(@Query() query: GetAllProductsRequestDTO) {
    const filter = {
      search: query.search,
      category: query.category,
    };

    const pagination = {
      limit: query.limit,
      order: query.order,
      skip: query.skip,
      sort: query.sort,
    };

    return this.getAllService.execute({ filter, pagination });
  }

  @Get(':id')
  @AllowPublicAccess()
  getProductById(@Param() { id }: IdParams) {
    return this.getOneService.execute({ id });
  }

  @Put(':id')
  updateProduct(@Param() { id }: IdParams, @Body() body: UpdateProductBody) {
    return this.updateService.execute({ id, ...body });
  }

  @Patch(':productId/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async uploadImage(
    @Param('productId') productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.uploadService.execute({ productId, file });
    return result;
  }

  @Delete(':id')
  deleteProduct(@Param() { id }: IdParams) {
    return this.deleteService.execute({ id });
  }
}
