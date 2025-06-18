import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor() {}

  @Post('')
  createProduct(@Body() input: any): Promise<any> {
    return input || 'createProduct';
  }

  @Get('')
  getProducts() {
    return 'getProducts';
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return `getProductById ${id}`;
  }

  @Put(':id')
  updateProduct(@Param('id') id: string) {
    return `updateProduct: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `deleteProduct ${id}`;
  }
}
