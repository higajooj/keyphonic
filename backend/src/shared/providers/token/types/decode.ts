import { JwtPayload } from 'jsonwebtoken';

export type DecodeInput = {
  token: string;
};

export interface DecodeOutput extends JwtPayload {
  id: string;
  email: string;
}
