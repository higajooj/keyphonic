import { Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";
import { ICryptographyProvider } from "../interface/ICryptographyProvider";
import { CompareInput, CompareOutput } from "../types/compare";
import { EncryptInput, EncryptOutput } from "../types/encrypt";

@Injectable()
export class BCryptGateway implements ICryptographyProvider {
  public async encrypt({ password }: EncryptInput): Promise<EncryptOutput> {
    return hash(password, await genSalt());
  }

  public async compare({ password, hash }: CompareInput): Promise<CompareOutput> {
    return compare(password, hash);
  }
}
