import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookSchema } from './schemas/book.schema';
import { MediaSchema } from 'src/config/sftp/schemas/media.schema';

@Module({
  imports: [SequelizeModule.forFeature([BookSchema, MediaSchema])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
