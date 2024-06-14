import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/database/prisma.service';
import { GetCompaniesHandler } from './handlers/get-companies.handler';
import { GetCompanyHandler } from './handlers/get-company.handler';

@Module({
  controllers: [CompanyController],
  providers: [PrismaService, GetCompanyHandler, GetCompaniesHandler],
})
export class CompanyModule {}
