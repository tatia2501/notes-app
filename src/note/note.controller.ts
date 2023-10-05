import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteReturnDto } from './note.returnDto';
import { NoteCreateDto } from './note.createDto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get(':note_id')
  async findNote(
    @Param('note_id', ParseUUIDPipe) note_id: string,
  ): Promise<NoteReturnDto> {
    return this.noteService.findNote(note_id);
  }
  @Get('user/:user_id')
  async findAll(
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<NoteReturnDto[]> {
    return this.noteService.findAll(user_id);
  }
  @Post('user/:user_id')
  async addNote(
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<NoteReturnDto> {
    return this.noteService.addNote(user_id);
  }
  @Delete(':note_id')
  async deleteMarker(@Param('note_id', ParseUUIDPipe) note_id: string) {
    await this.noteService.deleteNote(note_id);
  }

  @Put(':note_id')
  async changeMarker(
    @Param('note_id', ParseUUIDPipe) note_id: string,
    @Body() Note: NoteCreateDto,
  ) {
    await this.noteService.changeNote(note_id, Note);
  }
}
