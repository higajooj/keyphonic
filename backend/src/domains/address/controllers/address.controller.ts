import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AllowPublicAccess } from 'src/shared/decorators/allow-public-access.decorator';
import { IdParams } from 'src/shared/dto/id-param.dto';
import { CreateService } from '../use-case/create.service';
import { DeleteService } from '../use-case/delete.service';
import { GetOneService } from '../use-case/get-one.service';
import { UpdateService } from '../use-case/update.service';
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
  @AllowPublicAccess()
  createAddress(@Body() input: CreateAddressBody): Promise<any> {
    return this.createService.execute(input);
  }

  @Get(':id')
  getAddressById(@Param() { id }: IdParams) {
    return this.getOneService.execute({ id });
  }

  @Put(':id')
  updateAddress(@Param() { id }: IdParams, @Body() body: UpdateAddressBody) {
    return this.updateService.execute({ id, ...body });
  }

  @Delete(':id')
  deleteAddress(@Param() { id }: IdParams) {
    return this.deleteService.execute({ id });
  }
}
