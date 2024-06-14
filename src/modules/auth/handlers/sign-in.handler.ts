import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dtos/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
class SignInHandler {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    delete user.password;

    const payload = { sub: user.id, ...user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

export default SignInHandler;
