import { IsNotEmpty, IsString } from 'class-validator';
export class NoteCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  text: string;
}
