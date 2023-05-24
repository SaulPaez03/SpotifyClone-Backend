import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from './user.interface';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class User {
  @Prop({
    required: true,
    select: false,
  })
  password: string;
  @Prop()
  user_name: string;

  @Prop()
  email: string;
  @Prop()
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('songs', {
  foreignField: 'artists',
  localField: '_id',
  ref: 'Song',
  options: {},
});
