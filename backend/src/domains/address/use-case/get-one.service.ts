import { Injectable, NotFoundException } from "@nestjs/common";
import { IAddress } from "../address.domain";
import { IAddressRepository } from "../interfaces/address.interface";

export type GetOneServiceInput = {
  id: string;
};

export type GetOneServiceOutput = IAddress;

@Injectable()
export class GetOneService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  public async execute(input: GetOneServiceInput): Promise<GetOneServiceOutput> {
    const address = await this.addressRepository.findByUnique(input);
    if (!address) throw new NotFoundException(`Produto de ${JSON.stringify(input)}, não encontrado`);

    return address;
  }
}
