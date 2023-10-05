import { Injectable } from '@nestjs/common';
import { UserReturnDto } from './user.returnDto';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async addUser(): Promise<UserReturnDto> {
    return new UserReturnDto(
      await prisma.user.create({
        data: {
          code: uuidv4(),
        },
      }),
    );
  }

  async findUserByCode(code: string): Promise<UserReturnDto> {
    return new UserReturnDto(
      await prisma.user.findFirstOrThrow({
        where: {
          code: code,
        },
      }),
    );
  }

  async findUserById(id: string): Promise<UserReturnDto> {
    return new UserReturnDto(
      await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }

  async deleteUser(code: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        code: code,
      },
    });
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
