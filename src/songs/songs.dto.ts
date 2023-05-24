import { File } from 'buffer';

export class createSongDTO {
  title: string;
  genres: string;
  album: string;
  data: Express.Multer.File;
  artists: string;
}
