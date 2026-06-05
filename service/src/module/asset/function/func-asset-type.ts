import { BadRequestException } from "@nestjs/common";
import { AssetType } from "@prisma/client";

export function funcAssetType(mimeType: string): AssetType {
    if (mimeType.startsWith('image/')) {
        return AssetType.IMAGE;
    }
    if (mimeType.startsWith('video/')) {
        return AssetType.VIDEO;
    }
    throw new BadRequestException(`Unsupported file's mimeType: ${mimeType}`);
}