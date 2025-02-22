import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ExampleDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Admin1234_',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
