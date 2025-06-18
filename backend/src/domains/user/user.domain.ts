import { BadRequestException } from '@nestjs/common';
import BaseDomain, { BaseDomainInterface } from 'src/shared/domain/base-domain.domain';

type CreateUserInput = {
  name: string;
  password: string;
  email: string;

  isActive?: boolean;
} & BaseDomainInterface ;

type UpdateUserInput = Partial<Pick<CreateUserInput, 'name' | 'email'>>;
export class UserDomain extends BaseDomain {
  name: string;
  password: string;
  email: string;
  isActive: boolean;

  constructor(props: CreateUserInput) {
    super();
    this._validate(props);
    const payload = this._sanitize(props);

    this.name = payload.name;
    this.password = payload.password;
    this.email = payload.email;
    this.isActive = payload.isActive;
  }

  update(input: UpdateUserInput) {
    if (!this.isActive)
      throw new BadRequestException(
        'This user is not active, unable to update',
      );

    const payload = Object.assign({}, this);
    this._validate(Object.assign(payload, input));
    const sanitizedPayload = this._sanitize(Object.assign(payload, input));

    this.name = sanitizedPayload.name;
    this.email = sanitizedPayload.email;
  }

  disabled() {
    this.isActive = false;
  }
  private _validate(input: CreateUserInput) {
    if (input.id) return;
    if (
      !input.email ||
      !input.name ||
      !input.password 
    )
      throw new BadRequestException(
        'email, name and password are required fields',
      );
  }

  private _sanitize(input: CreateUserInput) {
    return {
      name: input.name.trim().replace(/\s+/g, ' '),
      password: input.password.trim(),
      email: input.email.trim().toLowerCase(),
      isActive: !!input.isActive,
    };
  }
}
