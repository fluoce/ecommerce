import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NotificationModule } from './notification/notification.module';
import { QueueModule } from './queue/queue.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [DatabaseModule, StorageModule, NotificationModule, QueueModule],
  providers: [],
  exports: [DatabaseModule, StorageModule, NotificationModule, QueueModule],
})
export class InfrastructureModule {}
