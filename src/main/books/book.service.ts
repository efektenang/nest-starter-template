import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookSchema } from './schemas/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookSchema)
    private readonly books: typeof BookSchema,
  ) {}

  async createBook(data: CreateBookDto): Promise<BookSchema> {
    try {
      const title = data.title;

      const saveBook = await this.books.create({
        title: title.toLowerCase(),
        publisher: data.publisher.toLowerCase(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      return saveBook;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getBookList(): Promise<BookSchema[]> {
    try {
      const books = await this.books.findAll();

      return books;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
