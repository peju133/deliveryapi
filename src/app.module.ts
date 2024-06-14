import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { ProductionModule } from './modules/production/production.module';
import { DistributionModule } from './modules/distribution/distribution.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { RedisCacheModule } from './shared/providers/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [
    RedisCacheModule,
    AuthModule,
    OrderModule,
    ProductionModule,
    DistributionModule,
    DeliveryModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
