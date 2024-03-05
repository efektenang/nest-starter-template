import { Controller, Post, Body, Res, Session, Req, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signInUser(
    @Body() body: SignInDto,
    @Res() res,
    @Session() session: { userId?: string, role?: string },
  ) {
    return this.authService
      .signIn(body)
      .then((result) => {
        session.userId = result.user.id;
        session.role = result.user.role;
        res.json({
          message: 'OK',
          data: { token: result.token },
        });
      })
      .catch((err: any) =>
        res.status(400).json({
          message: err.message,
        }),
      );
  }

  @Get('profile')
  async getProfile(@Res() res, @Session() session: { userId?: string }) {
    return this.authService
      .profile(session.userId)
      .then((result) => res.json({ message: 'OK', data: result }))
      .catch((err) => res.json({ message: err.message }));
  }

  @Delete('sign-out')
  async signOutUser(@Res() res, @Req() req: Request) {
    req.session.destroy((err) => {
      if (err) return res.json({ message: "Logout failed!" })
      
      res.json({message: "Anda telah logout"})
    })
  }
}
