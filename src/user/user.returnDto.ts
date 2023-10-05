import { User } from '@prisma/client';
export class UserReturnDto {
  constructor(user: User) {
    this.id = user.id;
    this.code = user.code;
  }
  id: string;
  code: string;
}
