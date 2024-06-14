import 'dotenv/config';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        isGlobal: true,
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        ttl: Number(process.env.REDIS_TTL),
      }),
    }),
  ],
  providers: [Logger],
  exports: [CacheModule],
})
export class RedisCacheModule {
  constructor(private readonly logger: Logger) {
    try {
      // Adicione logs ao construtor para verificar a conexão
      this.logger.log('RedisCacheModule initialized');
    } catch (error) {
      this.logger.error(
        `Erro ao inicializar RedisCacheModule: ${error.message}`,
      );
    }
  }
}
