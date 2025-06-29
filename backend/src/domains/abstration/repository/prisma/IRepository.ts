export interface AggregateBaseArgs {
  pipeline: object[];
  options?: object;
}

export abstract class IPrismaRepository<FindFirstArgsBase, WhereUniqueInput, CreateInput, UpdateInput, Model> {
  abstract findAll(data?: FindFirstArgsBase): Promise<Model[]>;
  abstract findByUnique(unique: WhereUniqueInput): Promise<Model | void>;
  abstract create(data: CreateInput): Promise<Model>;
  abstract update(unique: WhereUniqueInput, data: Omit<UpdateInput, "order">): Promise<Model | void>;
  abstract delete(unique: WhereUniqueInput): Promise<void>;
  abstract count(data?: FindFirstArgsBase): Promise<number>;
  abstract aggregate(args: AggregateBaseArgs): Promise<any>;
}
