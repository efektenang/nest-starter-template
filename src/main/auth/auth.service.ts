import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as encryptions from '@/config/pass-generator.config';
import { encToken } from 'src/config/jwt-generator.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) throw new UnauthorizedException('Email atau password salah');

    const [_hash, _salt] = user.password.split(' ');
    const newEnc = encryptions.hashing(data.password, _salt);

    if (newEnc.hash !== _hash)
      throw new UnauthorizedException('Email atau Password salah');

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: encToken(token),
      user: user,
    };
  }

  async profile(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
