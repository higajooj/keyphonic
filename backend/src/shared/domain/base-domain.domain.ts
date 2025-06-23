export interface BaseDomainInterface {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class BaseDomain {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {}
}
