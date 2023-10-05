import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteReturnDto } from './note.returnDto';
import { PrismaClient } from '@prisma/client';
import { NoteCreateDto } from './note.createDto';

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

  async findAll(user_id: string): Promise<NoteReturnDto[]> {
    const notes_arr = await prisma.note.findMany({
      where: {
        user_id,
      },
    });
    if (notes_arr == null) throw new NotFoundException();
    const notes = [];
    notes_arr.forEach((note) => {
      notes[notes.length] = new NoteReturnDto(note);
    });
    return notes;
  }

  async addNote(user_id: string): Promise<NoteReturnDto> {
    return new NoteReturnDto(
      await prisma.note.create({
        data: {
          title: 'Новая заметка',
          text: 'Введите текст',
          date: new Date(),
          user_id: user_id,
        },
      }),
    );
  }

  async deleteNote(id: string) {
    await prisma.note.delete({
      where: {
        id,
      },
    });
  }

  async changeNote(id: string, note: NoteCreateDto) {
    await prisma.note.update({
      where: {
        id,
      },
      data: {
        title: note.title,
        text: note.text,
        date: new Date(),
      },
    });
  }
}
