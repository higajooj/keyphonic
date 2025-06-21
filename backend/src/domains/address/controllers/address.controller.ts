import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateService } from '../use-case/create.service';
import { GetOneService } from '../use-case/get-one.service';
import { UpdateService } from '../use-case/update.service';
import { DeleteService } from '../use-case/delete.service';
import { IdParams } from 'src/shared/dto/id-param.dto';
import { CreateAddressBody } from './dto/create-address.dto';
import { UpdateAddressBody } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(
    private readonly createService: CreateService,
    private readonly getOneService: GetOneService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @Post('')
  createProduct(@Body() input: CreateAddressBody): Promise<any> {
    return this.createService.execute(input);
  }

  @Get(':id')
  getProductById(@Param() { id }: IdParams) {
    return this.getOneService.execute({ id });
  }

  @Put(':id')
  updateProduct(@Param() { id }: IdParams, @Body() body: UpdateAddressBody) {
    return this.updateService.execute({ id, ...body });
  }

  @Delete(':id')
  deleteProduct(@Param() { id }: IdParams) {
    return this.deleteService.execute({ id });
  }
}
