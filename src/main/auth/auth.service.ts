import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }
  
  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.userModel.find({ email: signInDto.email });
    if (user[0] === undefined)
      throw new UnauthorizedException('Email atau password salah');

    const isMatch = await bcrypt.compare(signInDto.password, user[0].password);
    if (!isMatch) throw new UnauthorizedException('Email atau Password salah');

    const payload = { sub: user[0]._id, email: user[0].email };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
