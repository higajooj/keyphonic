import { Injectable } from "@nestjs/common";
import { AddressDomain, IAddress } from "../address.domain";
import { IAddressRepository } from "../interfaces/address.interface";

export type CreateServiceInput = {
  street: string;
  number: string;
  neighborhood: string;
  zip_code: string;
  complement?: string;
  city: string;
  state: string;
};

export type CreateServiceOutput = IAddress;

@Injectable()
export class CreateService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  public async execute(input: CreateServiceInput): Promise<CreateServiceOutput> {
    const domain = new AddressDomain(input);
    const product = await this.addressRepository.create({
      ...domain,
    });

    return product;
  }
}
