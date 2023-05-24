import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async findByUsername(username: string) {
    return await this.userModel
      .findOne({
        user_name: username,
      })
      .select('+password');
  }

  async createNewUser(user: User) {
    return await this.userModel.create(user);
  }

  async findAllUsers() {
    return await this.userModel.find();
  }
}
