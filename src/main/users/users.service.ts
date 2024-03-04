import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as encryptions from '@/config/pass-generator.config';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    try {
      const hashPassword = encryptions.encryptPassword(data.password);
      const createData = new this.userModel({
        ...data,
        password: [hashPassword.hash, hashPassword.salt].join(' '),
      });

      return createData.save();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().select('-password');
      if (users[0] === undefined) return null;

      return users;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findOne(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async userExists(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) return true;

    return false;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(username);

      const updateData = await this.userModel.updateOne(
        { username: username },
        { ...updateUserDto },
      );

      return updateData;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
