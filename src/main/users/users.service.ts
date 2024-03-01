import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    try {
      const isExists = await this.userModel.findOne({ email: data.email });
      if (isExists) throw new ConflictException('Email is already exists!');

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds)
      const createData = new this.userModel({
        ...data,
        password: await bcrypt.hash(data.password, salt)
      });

      return createData.save();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find()
      if (users[0] === undefined) return null
      
      return users
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
