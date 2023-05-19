import { File } from 'buffer';

export class createSongDTO {
  title: string;
  genres: string;
  // cover_image: Express.Multer.File;
  data: Express.Multer.File;
}
