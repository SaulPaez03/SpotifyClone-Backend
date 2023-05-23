import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GenreDocument = mongoose.HydratedDocument<Genre>;
@Schema()
export class Genre {
  @Prop({
    required: true,
  })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
