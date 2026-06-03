import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { databaseConfig } from 'src/config/database.config';
import { funcTryCatch } from 'src/function/func-try-catch';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: databaseConfig().postgresqlUrl,
      }),
    });
  }

  async onModuleInit() {
    await funcTryCatch({
      func: () => this.$connect(),
      logger: this.logger,
      action: 'PrismaService.$connect',
    });
  }

  async onModuleDestroy() {
    await funcTryCatch({
      func: () => this.$disconnect(),
      logger: this.logger,
      action: 'PrismaService.$disconnect',
    });
  }
}
