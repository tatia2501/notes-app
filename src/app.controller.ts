import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  index() {
    return {
      title: 'Заметки',
    };
  }

  @Get('/notes')
  @Render('notes')
  notes() {
    return {
      title: 'Заметки',
    };
  }

  @Get('/view')
  @Render('view')
  view() {
    return {
      title: 'Заметки',
    };
  }

  @Get('/edit')
  @Render('edit')
  edit() {
    return {
      title: 'Заметки',
    };
  }
}
