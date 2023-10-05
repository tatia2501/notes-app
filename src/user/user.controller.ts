import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserReturnDto } from './user.returnDto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('')
  async addUser(): Promise<UserReturnDto> {
    return this.userService.addUser();
  }

  @Get('/:code')
  async findUserByCode(@Param('code') code: string): Promise<UserReturnDto> {
    return this.userService.findUserByCode(code);
  }

  @Get('/id/:id')
  async findUserById(@Param('id') id: string): Promise<UserReturnDto> {
    return this.userService.findUserById(id);
  }

  @Delete(':code')
  async deleteUser(@Param('code', ParseUUIDPipe) code: string) {
    await this.userService.deleteUser(code);
  }
}
