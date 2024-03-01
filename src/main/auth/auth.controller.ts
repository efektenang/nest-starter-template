import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signInUser(@Body() body: SignInDto, @Res() res) {
    return this.authService
      .signIn(body)
      .then((result) =>
        res.json({
          message: 'OK',
          data: result,
        }),
      )
      .catch((err: any) =>
        res.status(400).json({
          message: err.message,
        }),
      );
  }
}
