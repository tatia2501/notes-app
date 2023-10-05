import { Injectable } from '@nestjs/common';
import { NoteReturnDto } from './note.returnDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class NoteService {
  async findNote(id: string): Promise<NoteReturnDto> {
    return new NoteReturnDto(
      await prisma.note.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }
}
