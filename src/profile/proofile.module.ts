import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class ProfileModule {}
