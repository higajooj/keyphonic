import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { AddressController } from './controllers/address.controller';
import { IAddressRepository } from './interfaces/address.interface';
import { AddressRepository } from './repository/address.repository';
import { CreateService } from './use-case/create.service';
import { GetOneService } from './use-case/get-one.service';
import { UpdateService } from './use-case/update.service';
import { DeleteService } from './use-case/delete.service';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [
    PrismaService,
    { provide: IAddressRepository, useClass: AddressRepository },
    CreateService,
    GetOneService,
    UpdateService,
    DeleteService,
  ],
})
export class AddressModule {}
