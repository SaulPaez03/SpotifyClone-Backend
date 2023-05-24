import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SongsService } from './songs.service';
import { createSongDTO as createSongDTO } from './songs.dto';
import { Request, Express } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { User } from 'src/auth/auth.decorator';
import { ReqUser } from 'src/auth/auth.interface';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post('new')
  @UseInterceptors(FileInterceptor('data'))
  uploadSongs(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: createSongDTO,
    @User() user: ReqUser,
  ) {
    return this.songsService.createNewSong(
      {
        ...body,
        data: file,
      },
      user,
    );
  }
}
