import { IsEmailUserAlreadyExist } from '@/config/validators/is-email.validator';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsEmailUserAlreadyExist({
    message: 'Email is already exists',
  })
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,32}$/g,
    {
      message:
        'Password must contains at least 1 lowercase, uppercase, number and special characters, with the length password in 8-32 characters.',
    },
  )
  password: string;
}
