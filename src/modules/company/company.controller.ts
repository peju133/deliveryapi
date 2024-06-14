import { Controller, Get, Param } from '@nestjs/common';
import { GetCompaniesHandler } from './handlers/get-companies.handler';
import { GetCompanyHandler } from './handlers/get-company.handler';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly getCompanyHandler: GetCompanyHandler,
    private readonly getCompaniesHandler: GetCompaniesHandler,
  ) {}

  @Get('/list')
  async getCompanies() {
    return await this.getCompaniesHandler.execute();
  }

  @Get('/:id')
  async getCompany(@Param('id') id: string) {
    return await this.getCompanyHandler.execute(id);
  }
}
