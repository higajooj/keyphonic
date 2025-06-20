import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateService } from '../use-case/create.service';
import { CreateProductBody } from './dto/create-product.dto';
import { IdParams } from 'src/shared/dto/id-param.dto';
import { GetOneService } from '../use-case/get-one.service';
import { GetAllProductsRequestDTO } from './dto/get-all-products.dto';
import { GetAllService } from '../use-case/get-all.service';
import { UpdateService } from '../use-case/update.service';
import { UpdateProductBody } from './dto/update-product.dto';
import { DeleteService } from '../use-case/delete.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createService: CreateService,
    private readonly getOneService: GetOneService,
    private readonly getAllService: GetAllService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @Post('')
  createProduct(@Body() input: CreateProductBody): Promise<any> {
    return this.createService.execute(input);
  }

  @Get('')
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
  getProductById(@Param() { id }: IdParams) {
    return this.getOneService.execute({ id });
  }

  @Put(':id')
  updateProduct(@Param() { id }: IdParams, @Body() body: UpdateProductBody) {
    return this.updateService.execute({ id, ...body });
  }

  @Delete(':id')
  deleteProduct(@Param() { id }: IdParams) {
    return this.deleteService.execute({ id });
  }
}
