import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dtos/create-book.dto';
import { Response } from 'src/utilities/helper-type.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller()
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiBody({
    type: CreateBookDto,
    description: 'Json structure for user object',
  })
  async createBook(
    @Res() res: Response,
    @Body() body: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service
      .createBook(body, file)
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
