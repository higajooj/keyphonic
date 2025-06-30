import { Injectable, NotFoundException } from "@nestjs/common";
import { AddressDomain } from "../address.domain";
import { IAddressRepository } from "../interfaces/address.interface";
export type DeleteServiceInput = {
  id: string;
};

export type DeleteServiceOutput = { succes: true };

@Injectable()
export class DeleteService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  public async execute({ id }: DeleteServiceInput): Promise<DeleteServiceOutput> {
    const address = await this.addressRepository.findByUnique({
      id,
    });
    if (!address) throw new NotFoundException(`Produto de id: ${id}, não encontrado`);

    const domain = new AddressDomain(address);

    domain.delete();

    await this.addressRepository.update({ id }, domain);

    return { succes: true };
  }
}
