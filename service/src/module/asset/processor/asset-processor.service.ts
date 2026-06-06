import { BadRequestException, Inject, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { AssetCoreService } from "../service/asset-core.service";
import type { StorageService } from "src/infrastructure/storage/storage.interface";
import { funcSharpExtraLarge, funcSharpLarge, funcSharpMedium, funcSharpThumbnail, funcSharpTiny } from "src/module/asset/function/func-sharp";
import { funcWebpImageObjectKey } from "../function/func-object-key";
import { AssetType } from "@prisma/client";
import { currentStorageProvider } from "src/config/storage.config";

@Injectable()
export class AssetProcessorService {
    constructor(
        private readonly assetCoreService: AssetCoreService,
        @Inject(currentStorageProvider)
        private readonly storageService: StorageService
    ) { }

    async generateAssetVariants({ assetId }: { assetId: string }): Promise<{
        success: boolean,
        assetId: string,
        message?: string
    }> {
        const asset = await this.assetCoreService.getAssetById({ id: assetId })
        if (!asset) {
            throw new NotFoundException(`Asset ${assetId} not found`);
        }
        if (asset.type !== AssetType.IMAGE) {
            throw new BadRequestException('Asset is not image');
        }
        const buffer = await this.storageService.getObject({
            key: asset.originalKey
        })
        if (!buffer || buffer.length === 0) {
            throw new ServiceUnavailableException(`buffer for asset ${assetId} not found or is empty`);
        }
        const [tiny, thumbnail, medium, large, extraLarge] = await Promise.all([
            funcSharpTiny({ buffer }),
            funcSharpThumbnail({ buffer }),
            funcSharpMedium({ buffer }),
            funcSharpLarge({ buffer }),
            funcSharpExtraLarge({ buffer })
        ])
        const [tinyKey, thumbnailKey, mediumKey, largeKey, extraLargeKey] = await Promise.all([
            tiny
                ? this.storageService.putObject({
                    key: funcWebpImageObjectKey({
                        id: asset.id,
                        assetType: AssetType.IMAGE,
                        keyType: "tiny"
                    }),
                    buffer: tiny,
                    contentType: 'image/webp',
                })
                : Promise.resolve(),
            thumbnail
                ? this.storageService.putObject({
                    key: funcWebpImageObjectKey({
                        id: asset.id,
                        assetType: AssetType.IMAGE,
                        keyType: "thumbnail"
                    }),
                    buffer: thumbnail,
                    contentType: 'image/webp',
                })
                : Promise.resolve(),
            medium
                ? this.storageService.putObject({
                    key: funcWebpImageObjectKey({
                        id: asset.id,
                        assetType: AssetType.IMAGE,
                        keyType: "medium"
                    }),
                    buffer: medium,
                    contentType: 'image/webp',
                })
                : Promise.resolve(),
            large
                ? this.storageService.putObject({
                    key: funcWebpImageObjectKey({
                        id: asset.id,
                        assetType: AssetType.IMAGE,
                        keyType: "large"
                    }),
                    buffer: large,
                    contentType: 'image/webp',
                })
                : Promise.resolve(),
            extraLarge
                ? this.storageService.putObject({
                    key: funcWebpImageObjectKey({
                        id: asset.id,
                        assetType: AssetType.IMAGE,
                        keyType: "extraLarge"
                    }),
                    buffer: extraLarge,
                    contentType: 'image/webp',
                })
                : Promise.resolve(),
        ]);
        if (!thumbnailKey || !mediumKey || !largeKey) {
            throw new Error('One or more variant uploads failed');
        }
        const updatedAsset = await this.assetCoreService.addAssetObjectKey({
            id: asset.id,
            tinyKey: tinyKey ?? undefined,
            thumbnailKey: thumbnailKey ?? undefined,
            mediumKey: mediumKey ?? undefined,
            largeKey: largeKey ?? undefined,
            extraLargeKey: extraLargeKey ?? undefined
        });
        if (!updatedAsset) {
            throw new ServiceUnavailableException(`Failed to update asset ${asset.id} object keys.`);
        }
        return {
            success: true,
            assetId: updatedAsset.id
        }
    }
}