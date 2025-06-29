import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateService } from '../use-case/create.service';
import { IdParams } from 'src/shared/dto/id-param.dto';
import { CreateOrderBody } from './dto/create-order.dto';
import { UpdateOrderBody } from './dto/update-order.dto';
import { GetOneOrderService } from '../use-case/get-one.service';
import { UpdateOrderService } from '../use-case/update.service';
import { GetAllOrderService } from '../use-case/get-all.service';
import { GetAllOrdersRequestDTO } from './dto/get-all-order.dto';
import { AllowPublicAccess } from 'src/shared/decorators/allow-public-access.decorator';
import { GetStatsService } from '../use-case/get-stats.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createService: CreateService,
    private readonly getOneService: GetOneOrderService,
    private readonly getAllService: GetAllOrderService,
    private readonly updateService: UpdateOrderService,
    private readonly getStatsService: GetStatsService,
  ) {}

  @Post('')
  @AllowPublicAccess()
  createOrder(@Body() input: CreateOrderBody): Promise<any> {
    return this.createService.execute(input);
  }

  @Get('')
  getOrders(@Query() query: GetAllOrdersRequestDTO) {
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

  @Get('/stats')
  getChart() {
    return this.getStatsService.execute({});
  }

  @Get(':id')
  getOrderById(@Param() { id }: IdParams) {
    return this.getOneService.execute({ id });
  }

  @Put(':id')
  updateOrder(@Param() { id }: IdParams, @Body() body: UpdateOrderBody) {
    return this.updateService.execute({ id, ...body });
  }
}
