import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullmqService } from './bullmq/bullmq.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { databaseConfig } from 'src/config/database.config';
import { QUEUE_TYPES, QUEUES } from 'src/config/queue.config';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: databaseConfig().redisUrl
      }
    }),
    BullModule.registerQueue({
      name: QUEUES.ASSET_PROCESSING,
    }),
  ],
  providers: [
    {
      provide: QUEUE_TYPES.BULLMQ,
      useClass: BullmqService,
    },
    {
      provide: QUEUE_TYPES.RABBITMQ,
      useClass: RabbitmqService,
    },
  ],
  exports: [QUEUE_TYPES.BULLMQ, QUEUE_TYPES.RABBITMQ,],
})
export class QueueModule { }
