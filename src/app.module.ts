import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  // imports: [UserModule, MarkerModule, AnimationModule],
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          P2000: HttpStatus.BAD_REQUEST,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}