import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dtos/create-book.dto';
import { Response } from 'src/utilities/helper-type.util';

@Controller()
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiResponse({ status: 400, description: 'Email atau password salah.' })
  @ApiBody({
    type: CreateBookDto,
    description: 'Json structure for user object',
  })
  async createBook(@Res() res: Response, @Body() body: CreateBookDto) {
    return this.service
      .createBook(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  async getAllBook(@Res() res) {
    return this.service
      .getBookList()
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getBookById(@Res() res: Response, @Param('id') id: number) {
    return this.service
      .getBookById(id)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }
}
