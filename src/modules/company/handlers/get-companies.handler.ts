import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class GetCompaniesHandler {
  constructor(private prismaService: PrismaService) {}

  async execute(): Promise<Company[]> {
    return await this.prismaService.company.findMany({
      include: {
        category: {
          select: {
            category_company: true,
          },
        },
      },
    });
  }
}
