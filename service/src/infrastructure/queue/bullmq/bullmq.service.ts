import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../queue.interface';
import { Job, Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { funcTryCatch } from 'src/function/func-try-catch';
import { QUEUES, QUEUES_NAMES } from 'src/config/queue.config';

@Injectable()
export class BullmqService implements QueueService {

    private readonly logger = new Logger(BullmqService.name);

    constructor(
        @InjectQueue(QUEUES.ASSET_PROCESSING)
        private readonly assetProcessingQueue: Queue,
    ) { }

    async addAssetProcessingJob({ assetId }: { assetId: string }) {
        await funcTryCatch<Job, null>({
            func: () =>
                this.assetProcessingQueue.add(
                    QUEUES_NAMES.GENERATE_VARIANTS,
                    { assetId },
                    {
                        attempts: 3,
                        backoff: {
                            type: 'exponential',
                            delay: 5000,
                        },
                        removeOnComplete: 1000,
                        removeOnFail: 5000,
                    },
                ),
            action: QUEUES_NAMES.GENERATE_VARIANTS,
            logger: this.logger,
        });
    }
}