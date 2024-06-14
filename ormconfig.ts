import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
console.log(__dirname + '/src/entities/**/*.entity.ts');
export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'seu-usuario',
  password: process.env.DB_PASSWORD || 'sua-senha',
  database: process.env.DB_DATABASE || 'seu-banco-de-dados',
  entities: ['dist/src/entities/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  migrationsTableName: 'migrations',
} as TypeOrmModuleOptions;
