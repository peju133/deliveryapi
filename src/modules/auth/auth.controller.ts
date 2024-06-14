import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import SignInHandler from './handlers/sign-in.handler';
import { SignInDto } from './dtos/sign-in.dto';
import { User } from '@prisma/client';
import { SignUpDto } from './dtos/sign-up.dto';
import SignUpHandler from './handlers/sign-up.handler';

@Controller('auth')
export class AuthController {
  constructor(
    private signInHandler: SignInHandler,
    private signUpHandler: SignUpHandler,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.signInHandler.execute({
      email: signInDto.email,
      password: signInDto.password,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.signUpHandler.execute(body);
  }
}
