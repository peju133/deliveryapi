import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignUpDto } from '../dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
class SignUpHandler {
  constructor(private prismaService: PrismaService) {}

  async execute(data: SignUpDto) {
    const { email, password, username } = data;
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new UnauthorizedException('User already registred!');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const userCreated = await this.prismaService.user.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    return userCreated;
  }
}

export default SignUpHandler;
