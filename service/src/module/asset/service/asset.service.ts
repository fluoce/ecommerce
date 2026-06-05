import { BadRequestException, Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { STORAGE_TYPES } from 'src/infrastructure/storage/storage.constants';
import type { StorageService } from 'src/infrastructure/storage/storage.interface';
import { AssetUploadCompleteDto, CreateSignUrlDto } from '../types/create-asset.types';
import { IdService } from 'src/lib/id/id.service';
import { funcAllowSize } from '../function/func-allow-size';
import { funcObjectKey } from '../function/func-object-key';
import { funcAssetType } from '../function/func-asset-type';
import { ResponseDataType } from 'src/types/response.type';
import { AssetCoreService } from './asset-core.service';
import type { QueueService } from 'src/infrastructure/queue/queue.interface';
import { AssetStatus, AssetType } from '@prisma/client';
import { QUEUE_TYPES } from 'src/infrastructure/queue/queue.constants';

@Injectable()
export class AssetService {

    constructor(
        @Inject(STORAGE_TYPES.S3)
        private readonly storageService: StorageService,
        private readonly id: IdService,
        private readonly assetCoreService: AssetCoreService,
        @Inject(QUEUE_TYPES.BULLMQ)
        private readonly queueService: QueueService
    ) { }

    async getPreSignedUploadUrl({ data: { fileName, mimeType, size, usage } }: { data: CreateSignUrlDto }): Promise<ResponseDataType> {
        const sizeCheck = funcAllowSize({
            mimeType: mimeType,
            size: size
        })
        if (!sizeCheck.isAllow) {
            throw new BadRequestException(`${sizeCheck.message}`)
        }
        const id = this.id.generate()
        const type = funcAssetType(mimeType);
        const originalKey = funcObjectKey({
            id,
            assetType: type,
            fileName: fileName,
            keyType: 'original'
        })
        const uploadUrl = await this.storageService.preSignedUrl({
            key: originalKey,
            mimeType: mimeType
        })
        if (!uploadUrl) {
            throw new ServiceUnavailableException("unable to create asset, Please try again later.");
        }
        const asset = await this.assetCoreService.createAsset({
            data: {
                id,
                fileName,
                mimeType,
                originalKey,
                type,
                usage,
                provider: this.storageService.provider,
            }
        })
        if (!asset) {
            throw new ServiceUnavailableException("unable to create asset, Please try again later.");
        }
        return {
            assetId: asset.id,
            uploadUrl
        }
    }

    async assetUploadComplete({ data: { assetId } }: { data: AssetUploadCompleteDto }): Promise<ResponseDataType> {
        const asset = await this.assetCoreService.getAssetById({ id: assetId })
        if (!asset) {
            throw new NotFoundException("asset not found")
        }
        const objectExists = await this.storageService.exists({
            key: asset.originalKey
        })
        if (!objectExists) {
            throw new NotFoundException("asset not exists")
        }
        if (asset.status === AssetStatus.PROCESSING) {
            throw new BadRequestException('Asset is already processing');
        }
        if (asset.status === AssetStatus.READY) {
            throw new BadRequestException('Asset is already processed');
        }
        if (asset.status === AssetStatus.DELETED) {
            throw new BadRequestException('Asset is deleted');
        }
        if (asset.type === AssetType.IMAGE) {
            await this.queueService.addAssetProcessingJob({ assetId });
        }
        return {
            assetId,
        }
    }
}
