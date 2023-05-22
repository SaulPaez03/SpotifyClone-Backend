import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../interfaces/user.interface';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  password: string;
  @Prop()
  user_name: string;

  @Prop()
  email: string;
  @Prop()
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
