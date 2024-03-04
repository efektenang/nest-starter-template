import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() body: CreateUserDto, @Res() res) {
    return this.usersService
      .create(body)
      .then((result) => res.json({ message: 'OK', data: result }))
      .catch((err: any) =>
        res.status(400).json({ message: err.message }),
      );
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Res() res) {
    return this.usersService
      .findAll()
      .then((result) => res.json({ message: 'OK', data: result }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
