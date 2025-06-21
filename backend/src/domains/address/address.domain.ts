import { BadRequestException } from '@nestjs/common';
import BaseDomain, {
  BaseDomainInterface,
} from 'src/shared/domain/base-domain.domain';

export type IAddress = {
  id: string;

  street: string;
  number: string;
  neighborhood: string;
  zip_code: string;
  complement?: string;
  city: string;
  state: string;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
};

type CreateAddressInput = {
  street: string;
  number: string;
  neighborhood: string;
  zip_code: string;
  complement?: string;
  city: string;
  state: string;
  isActive?: boolean;
} & BaseDomainInterface;

type UpdateAddressInput = Partial<
  Pick<
    CreateAddressInput,
    | 'street'
    | 'number'
    | 'neighborhood'
    | 'zip_code'
    | 'complement'
    | 'city'
    | 'state'
  >
>;
export class AddressDomain extends BaseDomain {
  street: string;
  number: string;
  neighborhood: string;
  zip_code: string;
  complement?: string;
  city: string;
  state: string;
  isActive: boolean;

  constructor(props: CreateAddressInput) {
    super();
    this._validate(props);
    const payload = this._sanitize(props);

    this.street = payload.street;
    this.number = payload.number;
    this.neighborhood = payload.neighborhood;
    this.zip_code = payload.zip_code;
    this.complement = payload.complement;
    this.city = payload.city;
    this.state = payload.state;
    this.isActive = payload.isActive;
  }

  update(input: UpdateAddressInput) {
    const payload = Object.assign({}, this);
    this._validate(Object.assign(payload, input));
    const sanitizedPayload = this._sanitize(Object.assign(payload, input));

    this.street = sanitizedPayload.street;
    this.number = sanitizedPayload.number;
    this.neighborhood = sanitizedPayload.neighborhood;
    this.zip_code = sanitizedPayload.zip_code;
    this.complement = sanitizedPayload.complement;
    this.city = sanitizedPayload.city;
    this.state = sanitizedPayload.state;
  }

  delete() {
    this.isActive = false;
  }

  private _validate(input: CreateAddressInput) {
    if (input.id) return;
    if (
      !input.city ||
      !input.neighborhood ||
      !input.number ||
      !input.state ||
      !input.street ||
      !input.zip_code
    )
      throw new BadRequestException(
        'neighborhood, city, number, street, zip code and state are required fields',
      );
  }

  private _sanitize(input: CreateAddressInput) {
    return {
      street: input.street.trim().replace(/\s+/g, ' '),
      number: input.number.trim().replace(/\s+/g, ' '),
      neighborhood: input.neighborhood.trim().replace(/\s+/g, ' '),
      zip_code: input.zip_code.trim().replace(/\D+/g, ''),
      complement: input.complement
        ? input.complement.trim().replace(/\s+/g, ' ')
        : undefined,
      city: input.city.trim().replace(/\s+/g, ' '),
      state: input.state.trim().replace(/\s+/g, ' '),
      isActive: input.isActive !== undefined ? input.isActive : true,
    };
  }
}
