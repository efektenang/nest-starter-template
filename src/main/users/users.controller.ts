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
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../common/dtos/users/create-user.dto';
import { UpdateUserDto } from '../../common/dtos/users/update-user.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { Role, Roles } from '@/auth/roles/roles.decorator';
import { RolesGuard } from '@/auth/roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/utilities/helper-type.util';

@ApiTags('Manage Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.usersService
      .create(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findAll(@Res() res) {
    return this.usersService
      .findAll()
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Json structure for user object',
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
