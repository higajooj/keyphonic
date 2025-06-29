import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AddressDomain, IAddress } from "../address.domain";
import { IAddressRepository } from "../interfaces/address.interface";

export type UpdateServiceInput = {
  id: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  zip_code?: string;
  complement?: string;
  city?: string;
  state?: string;
};

export type UpdateServiceOutput = IAddress;

@Injectable()
export class UpdateService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  public async execute({ id, ...input }: UpdateServiceInput): Promise<UpdateServiceOutput> {
    const Address = await this.addressRepository.findByUnique({
      id,
    });
    if (!Address) throw new NotFoundException(`Produto de id: ${id}, não encontrado`);

    const domain = new AddressDomain(Address);

    domain.update(input);

    const updateAddress = await this.addressRepository.update({ id }, domain);
    if (!updateAddress) throw new InternalServerErrorException(`Não foi possivel atualizar o produto de id: ${id}`);

    return updateAddress;
  }
}
