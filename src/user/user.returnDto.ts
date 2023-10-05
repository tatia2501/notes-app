import { User } from '@prisma/client';
export class UserReturnDto {
  constructor(user: User) {
    this.code = user.code;
  }
  code: string;
}
