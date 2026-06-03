import { Module } from '@nestjs/common';
import { BullmqService } from './bullmq/bullmq.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [],
  providers: [BullmqService, RabbitmqService],
  exports: [BullmqService, RabbitmqService],
})
export class QueueModule {}
