import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteReturnDto } from './note.returnDto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get(':note_id')
  async findNote(
    @Param('note_id', ParseUUIDPipe) id: string,
  ): Promise<NoteReturnDto> {
    return this.noteService.findNote(id);
  }
}
