import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'book name',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'publihser name',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  publisher: string;
}
