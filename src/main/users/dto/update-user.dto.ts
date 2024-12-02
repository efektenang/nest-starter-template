import { IsEmailUserAlreadyExist } from '@/config/validators/is-email.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'admin',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsEmailUserAlreadyExist({
    message: 'Email is already exists',
  })
  email: string;

  @ApiProperty({
    example: 'Admin1234_',
    required: true,
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,32}$/g,
    {
      message:
        'Password must contains at least 1 lowercase, uppercase, number and special characters, with the length password in 8-32 characters.',
    },
  )
  password: string;

  @ApiProperty({ example: 'Admin|Moderator|User' })
  @IsString()
  role: string;
}
