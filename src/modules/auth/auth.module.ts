import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import SignInHandler from './handlers/sign-in.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'src/database/prisma.service';
import SignUpHandler from './handlers/sign-up.handler';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE },
      }),
    }),
  ],
  providers: [SignInHandler, SignUpHandler, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
