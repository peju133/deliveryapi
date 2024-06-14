import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class GetCompanyHandler {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string): Promise<Company> {
    return await this.prismaService.company.findFirst({
      include: {
        product: true,
        order: true,
        category: {
          select: {
            category_company: true,
          },
        },
      },
      where: {
        id,
      },
    });
  }
}
