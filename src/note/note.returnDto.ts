import { Note } from '@prisma/client';
export class NoteReturnDto {
  constructor(note: Note) {
    this.id = note.id;
    this.title = note.title;
    this.text = note.text;
  }

  id: string;

  title: string;

  text: string;
}
