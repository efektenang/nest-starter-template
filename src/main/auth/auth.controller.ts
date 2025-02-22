import {
  Controller,
  Post,
  Body,
  Res,
  Session,
  Req,
  Get,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../../common/dtos/auth/sign-in.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/utilities/helper-type.util';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiResponse({ status: 400, description: 'Error message.' })
  @ApiBody({
    type: SignInDto,
    description: 'Json structure for user object',
  })
  async signInUser(
    @Body() body: SignInDto,
    @Res() res: Response,
    @Session() session: { userId?: string; role?: string },
  ) {
    return this.authService
      .signIn(body)
      .then((result) => {
        session.userId = result.user.id;
        session.role = result.user.role;
        res.asJson(HttpStatus.OK, { message: 'OK', data: result });
      })
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Get('profile')
  @ApiBearerAuth()
  async getProfile(
    @Res() res: Response,
    @Session() session: { userId?: string },
  ) {
    return this.authService
      .profile(session.userId)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }

  @Delete('sign-out')
  async signOutUser(@Res() res, @Req() req: Request) {
    req.session.destroy((err) => {
      if (err) return res.json({ message: 'Logout failed!' });

      res.json({ message: 'Anda telah logout' });
    });
  }
}
