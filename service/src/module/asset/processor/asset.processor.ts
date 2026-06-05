import { Logger } from '@nestjs/common';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUES, QUEUES_NAMES } from 'src/infrastructure/queue/queue.constants';
import { AssetProcessorService } from './asset-processor.service';
import { AssetCoreService } from '../service/asset-core.service';
import { AssetStatus } from '@prisma/client';

@Processor(QUEUES.ASSET_PROCESSING)
export class AssetProcessor extends WorkerHost {

    private readonly logger = new Logger(AssetProcessor.name)

    constructor(
        private readonly assetCoreService: AssetCoreService,
        private readonly assetProcessorService: AssetProcessorService
    ) {
        super();
    }

    async process(job: Job<{ assetId: string }>): Promise<any> {
        switch (job.name) {
            case QUEUES_NAMES.GENERATE_VARIANTS:
                return await this.assetProcessorService.generateAssetVariants({ assetId: job.data.assetId });
            default:
                break;
        }
    }

    @OnWorkerEvent('active')
    async onProcessStarted(job: Job<{ assetId: string }>) {
        if (job.attemptsMade > 0) {
            return;
        }
        await this.assetCoreService.updateAsssetStatus({
            id: job.data.assetId,
            status: AssetStatus.PROCESSING,
        });
    }

    @OnWorkerEvent('completed')
    async onProcessCompleted(job: Job<{ assetId: string }>) {
        await this.assetCoreService.updateAsssetStatus({
            id: job.data.assetId,
            status: AssetStatus.READY,
        });
    }

    @OnWorkerEvent('failed')
    async onProcessFailed(job: Job<{ assetId: string }>, error: Error) {
        const retriesExhausted = job.attemptsMade >= (job.opts.attempts ?? 1);
        if (!retriesExhausted) {
            return;
        }
        await this.assetCoreService.updateAsssetStatus({
            id: job.data.assetId,
            status: AssetStatus.FAILED
        })
        this.logger.error(error)
    }
}