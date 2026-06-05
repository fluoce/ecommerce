export interface QueueService {
    addAssetProcessingJob({ assetId }: { assetId: string }): any;
}