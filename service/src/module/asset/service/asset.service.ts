import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import type { StorageService } from 'src/infrastructure/storage/storage.interface';
import { CreateSignUrlDto } from '../dto/create-asset.types';
import { IdService } from 'src/lib/id/id.service';
import { funcAllowSize } from '../function/func-allow-size';
import { funcObjectKey } from '../function/func-object-key';
import { funcAssetType } from '../function/func-asset-type';
import { ResponseDataType } from 'src/types/response.type';
import { AssetCoreService } from './asset-core.service';
import type { QueueService } from 'src/infrastructure/queue/queue.interface';
import { Asset, AssetStatus, AssetType } from '@prisma/client';
import { currentStorageProvider, storageAssetPublicUrls } from 'src/config/storage.config';
import { currentQueueProvider } from 'src/config/queue.config';

@Injectable()
export class AssetService {

    constructor(
        @Inject(currentStorageProvider)
        private readonly storageService: StorageService,
        private readonly id: IdService,
        private readonly assetCoreService: AssetCoreService,
        @Inject(currentQueueProvider)
        private readonly queueService: QueueService
    ) { }

    async getPreSignedUploadUrl({ data: { fileName, mimeType, size } }: { data: CreateSignUrlDto }): Promise<ResponseDataType> {
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

    async assetUploadComplete(  { assetId } : { assetId:string }): Promise<ResponseDataType> {
        const asset = await this.assetCoreService.getAssetById({ id: assetId })
        if (!asset) {
            throw new NotFoundException("asset not found")
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
        const objectExists = await this.storageService.exists({
            key: asset.originalKey
        })
        if (!objectExists) {
            throw new NotFoundException("asset not exists")
        }
        if (asset.type === AssetType.IMAGE) {
            await this.queueService.addAssetProcessingJob({ assetId });
        } else if (asset.type === AssetType.VIDEO) {
            await this.assetCoreService.updateAsssetStatus({
                id: asset.id,
                status: AssetStatus.READY
            })
        }
        return {
            assetId,
        }
    }

    async deleteAsset({ assetId }: { assetId: string }): Promise<ResponseDataType> {
        const asset = await this.assetCoreService.updateAsssetStatus({
            id: assetId,
            status: AssetStatus.DELETED
        })
        if (!asset) {
            throw new NotFoundException("asset not found or failed to delete");
        }
        return {
            message: 'asset marked as deleted',
            assetId
        }
    }

    async assetPublicUrls({ asset, assetId }: { asset?: Asset | undefined, assetId?: string }): Promise<{
        originalUrl: string;
        tinyUrl?: string;
        thumbnailUrl?: string;
        mediumUrl?: string;
        largeUrl?: string;
        extraLargeUrl?: string;
    }> {
        if (!asset && !assetId) {
            throw new BadRequestException("Either asset or assetId is required");
        }
        const finalAsset =
            asset ??
            (await this.assetCoreService.getAssetById({
                id: assetId!,
            }));

        if (!finalAsset) {
            throw new NotFoundException('Asset not found');
        }
        const baseUrl = storageAssetPublicUrls()[finalAsset.provider];
        if (!baseUrl) {
            throw new InternalServerErrorException(
                `No public URL configured for provider ${finalAsset.provider}`,
            );
        }
        return {
            originalUrl: `${baseUrl}/${finalAsset.originalKey}`,
            tinyUrl: finalAsset.tinyKey ? `${baseUrl}/${finalAsset.tinyKey}` : undefined,
            thumbnailUrl: finalAsset.thumbnailKey ? `${baseUrl}/${finalAsset.thumbnailKey}` : undefined,
            mediumUrl: finalAsset.mediumKey ? `${baseUrl}/${finalAsset.mediumKey}` : undefined,
            largeUrl: finalAsset.largeKey ? `${baseUrl}/${finalAsset.largeKey}` : undefined,
            extraLargeUrl: finalAsset.extraLargeKey ? `${baseUrl}/${finalAsset.extraLargeKey}` : undefined
        };
    }

    async assetsPublicUrls({ assetIds }: { assetIds?: string[] }): Promise<Record<string, {
        originalUrl: string;
        tinyUrl?: string;
        thumbnailUrl?: string;
        mediumUrl?: string;
        largeUrl?: string;
        extraLargeUrl?: string;
    }>> {
        if (!assetIds) {
            throw new BadRequestException("assetIds are required");
        }
        const assets = await this.assetCoreService.getAssetByIds({ ids: assetIds });
        if (!assets || assets.length === 0) {
            throw new NotFoundException("No assets found for provided IDs");
        }
        const result: Record<string, {
            originalUrl: string;
            tinyUrl?: string;
            thumbnailUrl?: string;
            mediumUrl?: string;
            largeUrl?: string;
            extraLargeUrl?: string;
        }> = {};
        for (const asset of assets) {
            const baseUrl = storageAssetPublicUrls()[asset.provider];
            if (!baseUrl) {
                continue;
            }
            result[asset.id] = {
                originalUrl: `${baseUrl}/${asset.originalKey}`,
                tinyUrl: asset.tinyKey ? `${baseUrl}/${asset.tinyKey}` : undefined,
                thumbnailUrl: asset.thumbnailKey ? `${baseUrl}/${asset.thumbnailKey}` : undefined,
                mediumUrl: asset.mediumKey ? `${baseUrl}/${asset.mediumKey}` : undefined,
                largeUrl: asset.largeKey ? `${baseUrl}/${asset.largeKey}` : undefined,
                extraLargeUrl: asset.extraLargeKey ? `${baseUrl}/${asset.extraLargeKey}` : undefined
            };
        }
        return result;
    }
}
