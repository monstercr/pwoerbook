import { UserStatus } from '../../../core/enums/user-status.enum';

export interface IJwtTokenData {
  id: number;
  email: string;
  role: string;
  status: UserStatus;
}
