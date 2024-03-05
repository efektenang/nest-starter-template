import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@/config/jwt-register.config';
import { SessionModule } from 'nestjs-session';
import { sessionConfig } from '@/config/session.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync(jwtConfig),
    SessionModule.forRootAsync(sessionConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
