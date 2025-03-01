import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../common/models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt-register.config';
import { IsEmailUserAlreadyExistConstraint } from 'src/config/validators/is-email.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, IsEmailUserAlreadyExistConstraint],
})
export class UsersModule {}
